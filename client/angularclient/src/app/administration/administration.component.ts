import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Usersocu} from "../classes/usersocu";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {Observable, Subscription} from "rxjs";
import {Response} from "../classes/response";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit, OnDestroy {

  addForm: FormGroup;
  response: Response;
  subscription: Subscription;
  subscrip: Subscription;
  isSubmitButtonClicked = false;
  currentUser: Usersocu;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService) {
    this.getLoggedInUser();
  }

  ngOnInit(): void {
    this.createForm();
    this.response = new Response();
    this.response.message = "";
    this.response.status = "";
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-z ,.'-åäö]+$/i)]],
      email: ['', [Validators.required, Validators.email]],
      department: [''],
      employeenumber: ['']
    });
  }

  getLoggedInUser() {
    this.subscrip = this.userService.getUser(this.authService.getToken()).subscribe((data) => {
      let data2= JSON.stringify(data);
      this.currentUser = JSON.parse(data2);
    })
  }

  onSubmit() {
    if (this.addForm.invalid) {
      this.isSubmitButtonClicked = true;
      return;
    }
    let usersocu = new Usersocu();
    usersocu.name = this.addForm.get('name').value;
    usersocu.name = this.addForm.get('name').value;
    usersocu.email = this.addForm.get('email').value;
    usersocu.department = this.addForm.get('department').value;
    usersocu.employmentnumber = this.addForm.get('employeenumber').value;
    usersocu.usertype = 0;
    usersocu.companyorganizationnumber = this.currentUser.companyorganizationnumber;
    this.subscription = this.userService.sendUser(usersocu).subscribe((data) => {
      this.response = data;
      this.mailto(usersocu.email.toString());
      this.addForm.reset();
      window.location.reload();
    });
  }

  ngOnDestroy(): void {
    this.subscrip.unsubscribe();
  }

  mailto(emailaddress: string) {
    window.location.assign(`mailto:${emailaddress}?subject=Lösenord för SocialCube&body=Hej! Du har precis blivit tillagd som användare på SocialCube av ${this.currentUser.name}.%0D%0ADitt användarnamn: ${emailaddress}%0D%0ADitt lösenord: ${this.response.message}%0D%0ANär du loggat in för första gången bör du byta ditt lösenord. Detta gör du i din profil.`);
  }
}
