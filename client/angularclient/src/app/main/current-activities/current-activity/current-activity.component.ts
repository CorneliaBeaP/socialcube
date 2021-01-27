import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Activity} from "../../../classes/activity";
import {Subscription} from "rxjs";
import {ActivityService} from "../../../services/activity.service";
import {AuthService} from "../../../services/auth.service";

/**
 * Component used for showing a specific activity under "Current activities"
 */
@Component({
  selector: 'app-current-activity',
  templateUrl: './current-activity.component.html',
  styleUrls: ['./current-activity.component.css']
})
export class CurrentActivityComponent implements OnInit, OnDestroy {

  /**
   * The current activity
   */
  @Input('activity') activity: Activity;

  /**
   * Subscription to receive and send information to and from the backend
   */
  subscription: Subscription;

  /**
   * List of activities the currently logged in user has attended
   */
  attendedActivities: Activity[];
  /**
   * List of activities the currently logged in user has declined
   */
  declinedActivities: Activity[];
  /**
   * Boolean showing if the activity is attended or not by the currently logged in user
   */
  isAttended = false;
  /**
   * Boolean showing if the activity is declined or not by the currently logged in user
   */
  isDeclined = false;

  constructor(private activityService: ActivityService,
              private authService: AuthService) {
    this.isActivityAttended();
    this.isActivityDeclined();
  }

  ngOnInit(): void {
  }

  /**
   * Checks if the activity is attended by the logged in user
   */
  isActivityAttended() {
    this.subscription = this.activityService.getattendedActivities(this.authService.getToken()).subscribe((data) => {
      let data2 = JSON.stringify(data);
      this.attendedActivities = JSON.parse(data2);
      this.attendedActivities.forEach(a => {
        if (a.id == this.activity.id) {
          this.isAttended = true;
          return;
        }
      });
    });
  }

  /**
   * Checks if the activity is declined by the user
   */
  isActivityDeclined() {
    this.subscription = this.activityService.getDeclinedActivities(this.authService.getToken()).subscribe((data) => {
      let data2 = JSON.stringify(data);
      this.declinedActivities = JSON.parse(data2);
      this.declinedActivities.forEach(a => {
        if (a.id == this.activity.id) {
          this.isDeclined = true;
        }
      });
    });
  }

  /**
   * Forwards the information to the backend that the activity is being attended by the current user
   */
  attendActivity() {
    if(this.isDeclined){
      this.subscription = this.activityService.attendDeclinedActivity(this.authService.getToken(), this.activity.id);
    }else {
      this.subscription = this.activityService.attendActivity(this.authService.getToken(), this.activity.id);
    }
    location.reload();
  }

  /**
   * Unsubscribes from any subscriptions to prevent memory leak
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
