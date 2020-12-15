import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserInfo, rootReducerState } from '../../../ngrx/reducer';
import { user } from '../../../model/user-model';
import { userInfoAction } from '../../../ngrx/actions/user-action';

@Component({
  selector: 'app-landing-login',
  templateUrl: './landing-login.component.html',
  styleUrls: ['./landing-login.component.scss'],
})
export class LandingLoginComponent implements OnInit {
hide = true;
    registerLoginForm: FormGroup;
    loaderDisplay = false;
    displayUserEmail = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store<rootReducerState>
  ) {

  }

    ngOnInit() {

        this.createRegisterLoginForm();

  }
 private createRegisterLoginForm(): void{
this.registerLoginForm = this.formBuilder.group({
    email: new FormControl('guruhero@gmail.com', [Validators.required, Validators.email]),
  password: new FormControl('111111', [Validators.required, Validators.minLength(6)]),
  confirm_password: new FormControl('', [Validators.required, Validators.minLength(6)]) || '',
});
  }
 public async registerLoginSubmit(): Promise<void>{
     this.loaderDisplay = true;
     let email;
     let password;
     const confirm_password = this.registerLoginForm.value.confirm_password;
    // Login
     if (confirm_password === ''){
       email = this.registerLoginForm.value.email;
       password = this.registerLoginForm.value.password;
       await this.auth.signInWithEmailAndPassword(email, password).then(res => {
            const currentUser: user = {
                email: res.user.email,
                isNewUser: res.additionalUserInfo.isNewUser,
                creationTime: res.user.metadata.creationTime,
                lastSignInTime: res.user.metadata.lastSignInTime

            };
            console.log(res);
            this.store.dispatch(new userInfoAction({ data: currentUser }));
            this.router.navigate(['/home']);
            this.loaderDisplay = false;


      },
      err => {
        console.log(err);
        alert(err.message);
        this.loaderDisplay = false;
      });
    }
    // Register
    else{
      email = this.registerLoginForm.value.email;
      password = (this.registerLoginForm.value.password === this.registerLoginForm.value.confirm_password) ?
     await this.registerLoginForm.value.password : alert('Password and Confirm password must be match.');
    // create User in firebase
      this.auth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log(res);
      window.location.reload();
      this.loaderDisplay = false;
    }, err => {
      this.loaderDisplay = false;
      alert(err.message);
    });
    }
     console.log(this.registerLoginForm.value);
}
}
