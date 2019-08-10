import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoginUser } from './loginUser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private username : string = "";
  private password : string = "";
  private errorMessage : string = "";

  constructor(public loginService: LoginService, private router: Router) { }

  login() {
      this.loginService.loginWithUsername(this.username, this.password).subscribe((loginUser:LoginUser) => {
        this.loginService.currentUser = loginUser;
        this.router.navigate(['']);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.status==404 ? "Invalid user name or password":"Known Error";
        console.log(error);
        this.router.navigate(['/login']);
      });
  }

  logout() {
    this.loginService.signOut();
  }
}
