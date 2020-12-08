import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginpage = true;

  //TODO: varför går det inte att lägga in en formbuilder i contructorn, då försvinner sidan
  constructor() {
  }

  ngOnInit(): void {
  }

  showLoginPage(login: boolean): void {
    this.loginpage = login;
  }

  loginUser(event){
    event.preventDefault();
    console.log(event);
  }
}
