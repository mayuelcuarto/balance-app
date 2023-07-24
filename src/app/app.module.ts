import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ConceptosComponent } from './components/conceptos/conceptos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';

import { MaterialModule } from './material.module';
import { MainMenuComponent } from './main-menu/main-menu.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConceptoModalComponent } from './modals/concepto-modal/concepto-modal.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CategoriaModalComponent } from './modals/categoria-modal/categoria-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginMessageComponent } from './components/users/login-message/login-message.component';
import { BalanceComponent } from './components/balance/balance.component';

@NgModule({
  declarations: [
    AppComponent,
    ConceptosComponent,
    HomeComponent,
    MainMenuComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ConceptoModalComponent,
    CategoriasComponent,
    CategoriaModalComponent,
    LoginMessageComponent,
    BalanceComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
  ConceptoModalComponent,
  CategoriaModalComponent
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
