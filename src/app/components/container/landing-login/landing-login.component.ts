
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {  rootReducerState } from '../../../ngrx/reducer';
import {dialogDistinguish, User} from '../../../model/user-model';
import { userInfoAction } from '../../../ngrx/actions/user-action';
import {MatDialog} from '@angular/material/dialog';
import {MatErrorComponent} from '../../layout/dialog/mat-error-dialog';
import {ToastrService} from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Models } from 'src/app/model/models';

@Component({
    selector: 'app-landing-login',
    templateUrl: './landing-login.component.html',
    styleUrls: ['./landing-login.component.scss'],
})
export class LandingLoginComponent implements OnInit {
    public hide = true;
    public registerLoginForm: FormGroup;
    public loaderDisplay = false;
    private user: User;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private router: Router,
        private store: Store<rootReducerState>,
        private dialog: MatDialog,
        private toastr: ToastrService,
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
    public async registerLoginSubmit(buttonClicked: boolean): Promise<void>{
        this.loaderDisplay = true;
        let email;
        let password;
        const confirm_password = this.registerLoginForm.value.confirm_password;
        // Login
        if (buttonClicked === true){
            const loginInfo:Models.AuthCredential={            
            email : this.registerLoginForm.value.email,
            password : this.registerLoginForm.value.password};
            await this.authService.firebaseLogin(loginInfo).then((user:User) => {
                   
                    console.log(user);
                    this.store.dispatch(new userInfoAction({ data: user }));
                    this.router.navigate(['/home']);
                    this.loaderDisplay = false;


                },
                err => {
                    console.log(err);
                    this.displayError(err.message);
                    this.loaderDisplay = false;
                });
        }
        // Register
        else{
            if(this.registerLoginForm.value.password === this.registerLoginForm.value.confirm_password){
            const registerInfo:Models.AuthCredential={
            email : this.registerLoginForm.value.email,
            password : this.registerLoginForm.value.password
            };
            await  this.authService.firebaseRegister(registerInfo).then(res => {
                console.log(res);
                window.location.reload();
                this.loaderDisplay = false;
            }, err => {
                this.loaderDisplay = false;
                this.displayError(err.message);
            });
        }
        else{ 
            this.displayError('Password and Confirm password must be match.');
    }
            // create User in firebase
           
        }
    }
    private displayError(errorMessage: string): void{
        const dataConfig = {
            data: {
                errorMessage,
                dialogDistinguish: dialogDistinguish.errorDisplay,
                email: ''
            } ,
            width: '100%'
        };
        this.dialog.open(MatErrorComponent, dataConfig);
    }
    public  onForgotPassword(): void{
        const dataConfig = {
            data: {
                errorMessage: null,
                dialogDistinguish: dialogDistinguish.forgotPassword,
                email: ''
            },
            width: '100%',
            disableClose: true
        };
        const  dialogRef = this.dialog.open(MatErrorComponent, dataConfig);
        dialogRef.afterClosed().subscribe(data => {
            if (data.buttonClicked){
                this.forgotPassword(data.email);
            }
        });
    }
    public forgotPassword(email: string): void{
         this.authService.firebaseForgotPassword(email ).then(res => {
             this.toastr.success('Password reset link has been sent', 'Subscriptions');   
                 }, err => {
           this.displayError(err.message);
        });
    }
   public keyDownFunction(event):void{
    if(event.keyCode===13){
        this.registerLoginSubmit(true);
        }
}
}
