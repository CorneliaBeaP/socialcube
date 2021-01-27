import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {UserService} from "../../services/user.service";
import {Usersocu} from "../../classes/usersocu";
import {Activity} from "../../classes/activity";
import {Subscription} from "rxjs";
import {ExpiredPipe} from "../../helpers/pipes/expired.pipe";

@Component({
  selector: 'app-current-activities',
  templateUrl: './current-activities.component.html',
  styleUrls: ['./current-activities.component.css']
})
export class CurrentActivitiesComponent implements OnInit, OnDestroy {

  showCurrentActivities = false;
  currentActivities: Activity[];
  @Input('user') user: Usersocu;
  subscription: Subscription;


  constructor(private activityService: ActivityService,
              private userService: UserService,
              private expiredPipe: ExpiredPipe) {
  }

  ngOnInit(): void {
    this.getActivities();
  }

  /**
   * Gets the all the activities registered for the company in which the user works at and sorts away expired activities
   */
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
