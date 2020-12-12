import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import {HttpCacheService} from "../../../services/http-cache.service";
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {

  constructor(
    private auth:AngularFireAuth,
    private router:Router,
  private showCachedData:HttpCacheService) {
    this.showCachedData.displayCachedData=true;
  }
  ngOnInit() {}
logout(){
  this.auth.signOut().then(res=>{
    this.router.navigate(['']);
  });
}
}
