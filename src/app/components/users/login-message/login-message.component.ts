import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-message',
  templateUrl: './login-message.component.html',
  styleUrls: ['./login-message.component.css']
})
export class LoginMessageComponent implements OnInit {
  hide = true;

  constructor(
  	public afAuth: AngularFireAuth, 
    private router: Router,
    private authService: AuthService
  	) { }

  formLogin = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('')
  });

  ngOnInit() {
  }

  onLogin(): void{
    //console.log('email', this.formLogin.value.email);
    //console.log('password', this.formLogin.value.password);
    this.authService.loginEmailUser(this.formLogin.value.email, this.formLogin.value.password)
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => this.onCatchError(err));    
  }

  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => this.onCatchError(err));    
  }

  onLoginFacebook(): void{
    this.authService.loginFacebookUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => this.onCatchError(err));    
  }

  onLogout(): void{
    this.authService.logoutUser();
  }

  onLoginRedirect(): void{
    this.router.navigate(['conceptos/']);
  }

  onCatchError(err): void{
    console.log('err', err.message);
    alert(err.message);
  }

  getErrorMessage() {
    return this.formLogin.get('email').hasError('required') ? 'Debes ingresar un valor' :
        this.formLogin.get('email').hasError('email') ? 'Email inválido' :
            '';
  }

}
