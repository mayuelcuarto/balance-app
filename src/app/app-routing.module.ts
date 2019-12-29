import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { LoginMessageComponent} from './components/users/login-message/login-message.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ConceptosComponent } from './components/conceptos/conceptos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'user/login', component: LoginComponent },
	{ path: 'user/register', component: RegisterComponent },
	{ path: 'user/login-message', component: LoginMessageComponent},
	{ path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
	{ path: 'conceptos', component: ConceptosComponent, canActivate: [AuthGuard] },
	{ path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
