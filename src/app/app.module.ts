import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import {  environment} from '../environments/environment';
import { LandingLoginComponent } from './components/container/landing-login/landing-login.component';
import { AddSubscriptionComponent } from './components/container/add-subscription/add-subscription.component';
import { MatErrorComponent } from './components/layout/dialog/mat-error-dialog';
import {ColorPickerComponent} from './components/dialog/color-picker';

import { rootReducer } from './ngrx/reducer';
@NgModule({
  declarations: [AppComponent,
    BodyComponent,
    HomeComponent,
    FooterComponent,
    LandingLoginComponent,
    AddSubscriptionComponent,
    MatErrorComponent,
    ColorPickerComponent
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

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
