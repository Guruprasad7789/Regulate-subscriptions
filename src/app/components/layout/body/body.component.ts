import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {

  constructor(
    private auth:AngularFireAuth,
    private router:Router) {
  }
  ngOnInit() {}
logout(){
  this.auth.signOut().then(res=>{
    this.router.navigate(['']);
  });
}
}
