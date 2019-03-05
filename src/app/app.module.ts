import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctions, AngularFireFunctionsModule } from '@angular/fire/functions';

// Instructions ---->
// Replace configPlaceholder with your firebase credentials
import configPlaceholder from '../env';
import { CheckoutComponent } from './checkout/checkout.component';
import { ElementsComponent } from './elements/elements.component';

@NgModule({
  declarations: [AppComponent, CheckoutComponent, ElementsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(configPlaceholder),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
