import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginpage = true;
  username: string;
  password: string;

  //TODO: varför går det inte att lägga in en formbuilder i contructorn, då försvinner sidan
  constructor() {
  }

  ngOnInit(): void {
  }

  showLoginPage(login: boolean): void {
    this.loginpage = login;
  }

  loginUser(event) {
    console.log(this.username);
    console.log(this.password);
  }
}
