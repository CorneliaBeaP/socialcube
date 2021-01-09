import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Usersocu} from "../../classes/usersocu";
import {Activity} from "../../classes/activity";
import {Subscription} from "rxjs";
import {ExpiredPipe} from "../../helpers/expired.pipe";

@Component({
  selector: 'app-current-activities',
  templateUrl: './current-activities.component.html',
  styleUrls: ['./current-activities.component.css']
})
export class CurrentActivitiesComponent implements OnInit, OnDestroy {

  showCurrentActivities = true;
  currentActivities: Activity[];
  @Input('user') user: Usersocu;
  subscription: Subscription;


  constructor(private activityService: ActivityService,
              private userService: UserService,
              private expiredPipe: ExpiredPipe) {
  }

  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    this.getActivities();
  }


  getActivities() {
    if(this.user) {
      this.subscription = this.activityService.getActivities(this.user.token).subscribe(next => {
        this.currentActivities = this.expiredPipe.transform(next);
      });
    }
  }

  ngOnDestroy(): void {
  }
}
