import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {getUserInfo, rootReducerState} from '../../../ngrx/reducer';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
public userEmail: string;
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store<rootReducerState>,
    private toastr: ToastrService,
    ) {
  }
  ngOnInit() {
    this.store.select(getUserInfo).subscribe(data => {
     this.userEmail = data.email;
    });
  }
logout(){
  this.auth.signOut().then(res => {
    this.router.navigate(['']);
  });
  this.toastr.success(this.userEmail, 'You Logged out');
}
}
