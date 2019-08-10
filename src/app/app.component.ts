import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Angular 8 Application';
  public isLoggedIn: boolean;
  public img : any;

  constructor(public loginService: LoginService, private router: Router) {
    if(this.loginService.isUserLoggedIn) {
      this.router.navigate(['']);
    }
    else {
      this.router.navigate(['/login']);
    } 

  }

  logout() {
    this.loginService.signOut();
    this.router.navigate(['/login']);
  }


}
