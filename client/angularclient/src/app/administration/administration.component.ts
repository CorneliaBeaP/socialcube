import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Usersocu} from "../classes/usersocu";
import {LoginService} from "../services/login.service";
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
  emailstring= 'mailto:';
  newuseremail: string;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.response = new Response();
    this.response.message = "";
    this.response.status = "";
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required],
      employeenumber: ['', Validators.required]
    });
  }

  onSubmit() {
    let usersocu = new Usersocu();
    usersocu.name = this.addForm.get('name').value;
    usersocu.name = this.addForm.get('name').value;
    usersocu.email = this.addForm.get('email').value;
    usersocu.department = this.addForm.get('department').value;
    usersocu.employmentnumber = this.addForm.get('employeenumber').value;
    usersocu.usertype = 0;
    usersocu.companyorganizationnumber = this.loginService.getUserValue().companyorganizationnumber;
    this.subscription = this.userService.sendUser(usersocu).subscribe(data => {
      let data1 = JSON.stringify(data);
      this.response = JSON.parse(data1);
    });
    this.mailto(usersocu.email.toString());
    this.addForm.reset();
    window.location.reload();
    this.subscription.unsubscribe();
  }

  ngOnDestroy(): void {
  }

  mailto(emailaddress: string){
    window.location.assign('mailto:' + emailaddress);
  }
}
