
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {  rootReducerState } from '../../../ngrx/reducer';
import {dialogDistinguish, User} from '../../../model/user-model';
import { userInfoAction } from '../../../ngrx/actions/user-action';
import {MatDialog} from '@angular/material/dialog';
import {MatErrorComponent} from '../../layout/dialog/mat-error-dialog';
import {ToastrService} from 'ngx-toastr';

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
        private auth: AngularFireAuth,
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
            email = this.registerLoginForm.value.email;
            password = this.registerLoginForm.value.password;
            await this.auth.signInWithEmailAndPassword(email, password).then(res => {
                    const currentUser: User = {
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
                    this.displayError(err.message);
                    this.loaderDisplay = false;
                });
        }
        // Register
        else{
            email = this.registerLoginForm.value.email;
            password = (this.registerLoginForm.value.password === this.registerLoginForm.value.confirm_password) ?
                this.registerLoginForm.value.password : this.displayError('Password and Confirm password must be match.');
            // create User in firebase
            await  this.auth.createUserWithEmailAndPassword(email, password).then(res => {
                console.log(res);
                window.location.reload();
                this.loaderDisplay = false;
            }, err => {
                this.loaderDisplay = false;
                this.displayError(err.message);
            });
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
         this.auth.sendPasswordResetEmail(email ).then(res => {
             this.toastr.success('Password reset link has been sent', 'Subscriptions');        }, err => {
           this.displayError(err.message);
        });
    }
   public keyDownFunction(event):void{
       console.log(event)
    }
}
