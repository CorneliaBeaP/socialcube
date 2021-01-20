import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Usersocu} from "../../../classes/usersocu";
import {AuthService} from "../../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: Usersocu[];
  subscription: Subscription;
  @Input('currentuser') currentuser: Usersocu;

  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    this.subscription = this.userService.findAll(this.currentuser.companyorganizationnumber).subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
   this.subscription = this.userService.deleteUser(id).subscribe();
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
