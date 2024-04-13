import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

import { environment } from '../environments/environment';


import { TripsModule } from './trips/trips.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HistoryModule } from './history/history.module';
import { UserModule } from './user/user.module';
import { UserManagerModule } from './admin/user-manager.module';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    TripsModule,
    HistoryModule,
    UserModule,
    UserManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
