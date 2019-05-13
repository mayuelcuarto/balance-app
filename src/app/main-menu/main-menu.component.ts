import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
  	private breakpointObserver: BreakpointObserver,
  	private authService: AuthService,
  	private afsAuth: AngularFireAuth
  	) {}

  public isLogged: boolean = false;

  getCurrentUser(){
  	this.authService.isAuth().subscribe(auth => {
  		if(auth){
  			console.log('user logged');
  			this.isLogged = true;
  		}else{
  			console.log('user not logged');
  			this.isLogged = false;
  		}
  	})
  }

  ngOnInit() {
  	this.getCurrentUser();
  }

  onLogout(){
  	this.afsAuth.auth.signOut();
  }
}
