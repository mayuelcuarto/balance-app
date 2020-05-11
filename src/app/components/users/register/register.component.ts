import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('imageUser') inputImageUser: ElementRef;
  hide = true;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  constructor(
  	private router: Router, 
  	private authService: AuthService, 
  	private storage: AngularFireStorage
  	) { }

  formRegister = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit() {
  }

  onUpload(e){
    //console.log('subir',e.target.files[0]);
    const id = Math.random().toString(36).substr(2);
    const file = e.target.files[0];
    const filePath = `uploads / profile_${ id }`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  /*onAddUser(){
  	this.authService.registerUser(this.formRegister.value.email, this.formRegister.value.password)
  	.then((res) => {
      this.authService.isAuth().subscribe(user => {
        if(user){
          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value
          }).then((res) => {
            this.onRegisterRedirect();
          }).catch(err => this.onCatchError(err));
        }
      })
  	}).catch(err => this.onCatchError(err));
  }*/

  onAddUser(){
    if(this.formRegister.valid)
    this.authService.registerUser(this.formRegister.value.email, this.formRegister.value.password)
    .then((res) => {
      this.authService.isAuth().subscribe(user => {
        user.sendEmailVerification();
      })
    }).catch(err => this.onCatchError(err))
    .finally(() => {
      this.authService.logoutUser();
      this.onRegisterRedirect();
    });
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

  onLoginRedirect(): void{
    this.router.navigate(['conceptos']);
  }

  onRegisterRedirect(): void{
    this.router.navigate(['user/login-message']);
  }

  onCatchError(err): void{
    console.log('err', err.message);
    alert(err.message);
  }

  getErrorMessage() {
    return this.formRegister.get('email').hasError('required') ? 'Debes ingresar un valor' :
        this.formRegister.get('email').hasError('email') ? 'Email inválido' :
            '';
  }
}
