import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Usersocu} from "../../../classes/usersocu";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Usersocu[];

  constructor(private userService: UserService,
              private loginService: LoginService) {
  }


  ngOnInit(): void {
    this.userService.findAll(this.loginService.getUserValue().companyorganizationnumber).subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    console.log('Delete');
    this.userService.deleteUser(id);
  }
}
