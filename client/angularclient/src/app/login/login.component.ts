import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  showLoginPage(login: boolean): void {
    this.loginpage = login;
  }

  loginUser(event) {
    this.loginService.authenticate(this.username, this.password).subscribe(result => this.goToMainPage())
    console.log(this.username);
    console.log(this.password);
    console.log(this.loginService.authenticate(this.username, this.password));
  }

  goToMainPage() {
    this.router.navigate(['/home']);
  }
}
