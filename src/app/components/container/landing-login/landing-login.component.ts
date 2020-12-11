import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-login',
  templateUrl: './landing-login.component.html',
  styleUrls: ['./landing-login.component.scss'],
})
export class LandingLoginComponent implements OnInit {
hide=true;
regiserLoginForm:FormGroup;
loaderDisplay:boolean=false;
  constructor(
    private formBuilder:FormBuilder,
    private auth : AngularFireAuth,
    private router:Router
    ) { }

  ngOnInit() {
    this.createRegisterLoginForm();
  }
  createRegisterLoginForm(){
this.regiserLoginForm=this.formBuilder.group({
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  confirm_password:new FormControl('',[Validators.required,Validators.minLength(6)]) || '',
});
  }
  regiserLoginSubmit(){
    this.loaderDisplay=true;
    var email;
    var password;
    const confirm_password=this.regiserLoginForm.value['confirm_password'];
    //Login
    if(confirm_password === ''){
       email=this.regiserLoginForm.value['email'];
      password=this.regiserLoginForm.value['password'];
      this.auth.signInWithEmailAndPassword(email,password).then(res=>{
        console.log(res);
        this.router.navigate(['/home']);
        this.loaderDisplay=false;
      },
      err=>{
        alert(err.message);
        this.loaderDisplay=false;
      });
    }
    //Register
    else{
      email=this.regiserLoginForm.value['email'];
      password=(this.regiserLoginForm.value['password']===this.regiserLoginForm.value['confirm_password']) ?
      this.regiserLoginForm.value['password'] : alert('Password and Confirm password must be match.');
    //create User in firease
    this.auth.createUserWithEmailAndPassword(email,password).then(res=>{
      console.log(res);
      window.location.reload();
      this.loaderDisplay=false;
    },err=>{
      this.loaderDisplay=false;
      alert(err.message)
    });
    }
    console.log(this.regiserLoginForm.value);
}
}
