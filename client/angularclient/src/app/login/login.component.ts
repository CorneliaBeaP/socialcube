import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginpage = true;
  username: string;
  password: string;
  isAuthenticated = false;
  loginForm: FormGroup;

  //TODO: varför går det inte att lägga in en formbuilder i contructorn, då försvinner sidan
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  showLoginPage(login: boolean): void {
    this.loginpage = login;
  }

  loginUser(event) {
    this.username = this.loginForm.get('username').value;
    this.password = this.loginForm.get('password').value;
    this.loginService.authenticate(this.username, this.password).subscribe(boolean => this.isAuthenticated = boolean);
    console.log(this.isAuthenticated);
    if (this.isAuthenticated) {
      this.goToMainPage();
    } else {

    }
    this.loginForm.reset();
  }

  goToMainPage() {
    this.router.navigate(['/home']);
  }
}
