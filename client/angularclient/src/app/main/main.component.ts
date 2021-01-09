import {Component, OnDestroy, OnInit} from '@angular/core';
import {Usersocu} from "../classes/usersocu";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {Activity} from "../classes/activity";
import {ActivityService} from "../services/activity.service";
import {ExpiredPipe} from "../helpers/expired.pipe";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  user: Usersocu;
  subscription: Subscription;
  attendedActivities: Activity[];


  constructor(private authService: AuthService,
              private userService: UserService,
              private activityService: ActivityService,
              private expiredPipe: ExpiredPipe) {
    this.getLoggedInUser();
  }

  ngOnInit(): void {
  }

  getLoggedInUser(){
    this.subscription = this.userService.getUser(this.authService.getToken()).subscribe((data) => {
      let data2 = JSON.stringify(data);
      this.user = JSON.parse(data2);
      this.getAttendedActivities();
    }, error => {
      this.authService.logout();
    });
  }

  getAttendedActivities() {
   this.subscription = this.activityService.getattendedActivities(this.user.token).subscribe(data => {
      this.attendedActivities =this.expiredPipe.transform(data);
     console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
