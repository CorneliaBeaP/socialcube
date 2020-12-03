import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import { Usersocu } from "../../classes/usersocu";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Usersocu[];
  userService: UserService;

  constructor() {}

  ngOnInit(): void {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }
}
