import { NgModule } from '@angular/core';
import { AngularFirestoreModule, combineChange } from '@angular/fire/firestore';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddSubscriptionComponent } from './components/container/add-subscription/add-subscription.component';
import { LandingLoginComponent } from './components/container/landing-login/landing-login.component';
import { HomeComponent } from './components/layout/home/home.component';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = ()=> redirectUnauthorizedTo(['/']);
const routes: Routes = [
  {path: '',component:LandingLoginComponent },
  {path: 'home',component:HomeComponent,
  canActivate:[AngularFireAuthGuard]
  ,data:{
    authGuardPipe:redirectUnauthorizedToLogin
  }
 },
  {path:'add-subscription',component:AddSubscriptionComponent,
  canActivate:[AngularFireAuthGuard]
  ,data:{
    authGuardPipe:redirectUnauthorizedToLogin
  }}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
