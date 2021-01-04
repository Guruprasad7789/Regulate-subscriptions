import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {interval, Subscription} from 'rxjs';
declare var SMSReceive: any;

import {getUserInfo, rootReducerState} from '../../../ngrx/reducer';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
public userEmail: string;
  OTP = '';
  showOTPInput = false;
  message = 'hii';
  OTPmessage = 'An OTP is sent to your number. You should receive it in 15 s';
  messageSubscription: Subscription;
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store<rootReducerState>,
    private toastr: ToastrService,
    private toastCtrl: ToastController
    ) {
  }
  ngOnInit() {
    this.store.select(getUserInfo).subscribe(data => {
     this.userEmail = data.email;
    });
    const source = interval(1000);
    this.messageSubscription = source.subscribe(val => this.next());
  }
  next() {
    this.showOTPInput = true;
    this.start();
  }

  start() {
    SMSReceive.startWatch(
        () => {
          console.log('watch started');
          document.addEventListener('onSMSArrive', (e: any) => {
            const IncomingSMS = e.data;
            this.processSMS(IncomingSMS);
          });
        },
        () => { console.log('watch start failed'); }
    );
  }

  stop() {
    SMSReceive.stopWatch(
        () => { console.log('watch stopped'); },
        () => { console.log('watch stop failed'); }
    );
  }

  processSMS(data) {
    // Check SMS for a specific string sequence to identify it is you SMS
    // Design your SMS in a way so you can identify the OTP quickly i.e. first 6 letters
    // In this case, I am keeping the first 6 letters as OTP
    this.message = data.body;
    if (this.message.includes('netflix')) {
    this.presentToast('hello netflix', false, 'top', 1500);
    }
    this.stop();

  }
logout(){
  this.auth.signOut().then(res => {
    this.router.navigate(['']);
  });
  this.toastr.success(this.userEmail, 'You Logged out');
}
  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastCtrl.create({
      message,
      position,
      duration
    });
    toast.present();
  }
  message1() {
    if (this.message !== 'hii') {
      this.presentToast('You are successfully registered', false, 'top', 1500);
    } else {
      this.presentToast('Your OTP is not valid', false, 'bottom', 1500);
    }
  }
}
