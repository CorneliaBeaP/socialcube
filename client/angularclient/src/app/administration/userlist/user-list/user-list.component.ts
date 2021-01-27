import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Usersocu} from "../../../classes/usersocu";
import {AuthService} from "../../../services/auth.service";
import {Subscription} from "rxjs";

/**
 * Component in /administration that shows all the users registered to the company of the logged in user and makes it available to delete any user except the logged in user itself
 */
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  /**
   * The users registered to the company of the logged in user
   */
  users: Usersocu[];
  subscription: Subscription;
  /**
   * The currently logged in user
   */
  @Input('currentuser') currentuser: Usersocu;

  constructor(private userService: UserService) {
  }

  /**
   * Gets all the users registered to the company of the logged in user and saves them to the array "users"
   */
  ngOnInit(): void {
    this.subscription = this.userService.findAll(this.currentuser.companyorganizationnumber).subscribe(data => {
      this.users = data;
    });
  }

  /**
   * Deletes an user
   * @param id - userid
   */
  deleteUser(id: number) {
   this.subscription = this.userService.deleteUser(id).subscribe();
    window.location.reload();
  }

  /**
   * Unsubscribes from any subscriptions to prevent memory leak
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
