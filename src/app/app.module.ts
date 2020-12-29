import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { BodyComponent }  from '../app/components/layout/body/body.component';
import {HomeComponent} from '../app/components/layout/home/home.component';
import {FooterComponent} from '../app/components/layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { StoreModule } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {ColorPickerComponent} from './components/dialog/color-picker';
import { ToastrModule } from 'ngx-toastr';
import { ColorCircleModule } from 'ngx-color/circle'; // <color-circle></color-circle>


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  environment} from '../environments/environment';
import { LandingLoginComponent } from './components/container/landing-login/landing-login.component';
import { AddSubscriptionComponent } from './components/container/add-subscription/add-subscription.component';
import { MatErrorComponent } from './components/layout/dialog/mat-error-dialog';
import { rootReducer } from './ngrx/reducer';
import {SubscriptionCrudService} from './services/subscriptionCrud.service';
import {ColorSketchModule} from "ngx-color/sketch";
import { CustomPipeModule } from './pipes/pipe.module';
import { AuthenticationService } from './services/authentication.service';
import {AddLabelComponent} from "./components/dialog/add-label";
@NgModule({
  declarations: [AppComponent,
    BodyComponent,
    HomeComponent,
    FooterComponent,
    LandingLoginComponent,
    AddSubscriptionComponent,
    MatErrorComponent,
    ColorPickerComponent,
    AddLabelComponent
  ],
  entryComponents: [MatErrorComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(rootReducer),
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
      easing: 'ease-in',
      easeTime: 300,
    }),
    ColorCircleModule,
     ColorSketchModule,
     CustomPipeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SubscriptionCrudService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticationService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
