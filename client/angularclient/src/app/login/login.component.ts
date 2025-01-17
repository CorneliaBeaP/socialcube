import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {first} from "rxjs/operators";

/**
 * Component used when navigating to /login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  /**
   * Boolean if the login-page should be shown or the "I dont have an account"-page
   */
  loginpage = true;
  /**
   * Input string for the username given by the user
   */
  username: string;
  /**
   * Input string for the password given by the user
   */
  password: string;
  /**
   * Formgroup used for the input fields of username and password
   */
  loginForm: FormGroup;
  /**
   * url of where the user came from
   */
  returnUrl: string;
  /**
   * Boolean if the user has clicked the login-button or not
   */
  submitted = false;
  subscription: Subscription;
  /**
   * url of the background
   */
  background: string;
  /**
   * Boolean if the username and/or password are incorrect
   */
  isWrongCredentials: boolean;
  /**
   * Error message shown if the username and/or password are incorrect
   */
  error = '';
  /**
   * Array with urls to different background
   */
  backgrounds = [
    "../../assets/images/1BG.jpg",
    "../../assets/images/2BG.jpg",
    "../../assets/images/3BG.jpg",
    "../../assets/images/4BG.jpg",
    "../../assets/images/5BG.jpg",
    "../../assets/images/6BG.jpg",
    "../../assets/images/7BG.jpg",
    "../../assets/images/8BG.jpg",
    "../../assets/images/9BG.jpg",
    "../../assets/images/10BG.jpg",
    "../../assets/images/11BG.jpg",
    "../../assets/images/12BG.jpg",
    "../../assets/images/13BG.jpg",
  ];


  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  /**
   * Sets up the component when its created
   * - Resets Local Storage
   * - Sets a background
   * - Creates the login-form
   */
  ngOnInit(): void {
    this.resetLocalStorage();
    this.setBackground();
    this.createForm();
  }

  /**
   * Creates a login-form with username and password
   */
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  /**
   * Toggles if the Login-page or the I dont have an account-page should be shown
   * @param login boolean if the login-page should be shown, false if not
   */
  showLoginPage(login: boolean): void {
    this.loginpage = login;
  }

  /**
   * Takes the information provided in the login-form and forwards it to the backend, then recieving a response if the usercredentials are correct
   * which leads to the user being forwarded to /home, or if the usercredentials are wrong stays in /login with an error message explaining that the usercredentials are wrong
   */
  onSubmit() {
    this.isWrongCredentials = false;
    if (this.loginForm.invalid) {
      this.submitted = true;
      return;
    }

    this.subscription = this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe(data => {
        if (data == null) {
          this.isWrongCredentials = true;
          this.loginForm.get('password').reset();
        }
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.isWrongCredentials = true;
        this.error = 'Felaktigt användarenamn eller lösenord';
        this.loginForm.get('password').reset();
      });
  }

  /**
   * Shuffles the images in the array backgrounds[] and shows a random image as background on the login-page
   */
  setBackground() {
    let shuffled = this.backgrounds
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    this.background = shuffled[0];
  }

  /**
   * Logs out the user if he or she goes directly to /login
   */
  resetLocalStorage() {
    this.authService.logout();
  }

  /**
   * Unsubscribes from any subscriptions to prevent memory leak
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
