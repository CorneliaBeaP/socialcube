import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Usersocu} from "../../../classes/usersocu";
import {LoginService} from "../../../services/login.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: Usersocu[];
  subscription: Subscription;
  deletesub: Subscription;

  constructor(private userService: UserService,
              private loginService: LoginService) {
  }


  ngOnInit(): void {
    this.subscription = this.userService.findAll(this.loginService.getUserValue().companyorganizationnumber).subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    console.log('Delete');
    this.deletesub = this.userService.deleteUser(id).subscribe();
    window.location.reload();
    this.deletesub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
