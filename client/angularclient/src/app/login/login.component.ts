import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, of, Subscription} from "rxjs";
import {log} from "util";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginpage = true;
  username: string;
  password: string;
  isAuthenticated = false;
  loginForm: FormGroup;
  subscription: Subscription;


  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  showLoginPage(login: boolean): void {
    this.loginpage = login;
  }

  loginUser(event) {
    let current: string = '';
    Promise.resolve().then(value => {
      this.loginService.authenticate(this.loginForm.get('username').value, this.loginForm.get('password').value);
      setTimeout(() => {
        console.log(sessionStorage.getItem('id'));
        current = (sessionStorage.getItem('id'));
      }, 100);
      setTimeout(() => {
        if (!(current==null)) {
          console.log('approved!');
          this.goToMainPage();
        }else{
          console.log('not approved');
        }
      }, 500);
    });
    //TODO: sätt catch här


    // this.loginService.authenticate(this.loginForm.get('username').value, this.loginForm.get('password').value);
    // if (this.isAuthenticated) {
    //   this.goToMainPage();
    // }

  }

  goToMainPage() {
    this.router.navigate(['/home']);
  }

  executeErrorMessage(){
    //TODO: lägg in så att felmeddelande visas när man försöker logga in och skriver fel uppgifter
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
