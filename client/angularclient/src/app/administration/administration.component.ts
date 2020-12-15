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
    let usersocu = new Usersocu();
    usersocu.name = this.addForm.get('name').value;
    usersocu.name = this.addForm.get('name').value;
    usersocu.email = this.addForm.get('email').value;
    usersocu.department = this.addForm.get('department').value;
    usersocu.employmentnumber = this.addForm.get('employeenumber').value;
    usersocu.usertype = 0;
    usersocu.companyorganizationnumber = this.loginService.getUserValue().companyorganizationnumber;
    this.userService.sendUser(usersocu);
    this.addForm.reset();
  }
}
