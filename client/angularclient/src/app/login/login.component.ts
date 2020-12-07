import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginpage = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  showLoginPage(login: boolean): void {
    this.loginpage = login;
  }

}
