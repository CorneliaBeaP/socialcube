import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Usersocu} from "../classes/usersocu";
import {LoginService} from "../services/login.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.createForm();
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
    // if (this.addForm.invalid) {
    //   return;
    // }

    let usersocu = new Usersocu();
    usersocu.name = 'Anna';
    // usersocu.name = this.addForm.get('name').value;
    // usersocu.email = this.addForm.get('email').value;
    // usersocu.department = this.addForm.get('department').value;
    // usersocu.employmentnumber = this.addForm.get('employeenumber').value;
    // usersocu.usertype = 0;
    // usersocu.companyorganizationnumber = this.loginService.getUserValue().companyorganizationnumber;

    // this.userService.save(usersocu);
    console.log("Sparat");
    // console.log(this.addForm.get('name').value);
    // console.log(this.addForm.get('email').value);
    // console.log(this.addForm.get('department').value);
    // console.log(this.addForm.get('employeenumber').value);
  }

  createUser() {
    let usersocu = new Usersocu();
    usersocu.name = "Cornelia";
    usersocu.email = "email";
    // this.userService.sendUser(usersocu);
    console.log(JSON.stringify(usersocu));
  }

  create() {
    let usersocu = new Usersocu();
    // usersocu.name = this.addForm.value.name;
let stringy = 'Halloj';
    console.log("create()");
    this.userService.sendUser(stringy);
  }

}
