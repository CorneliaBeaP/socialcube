import {Component, Input, OnInit} from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {Activity} from "../../classes/activity";
import {AuthService} from "../../services/auth.service";
import {ExpiredPipe} from "../../helpers/pipes/expired.pipe";
import {Usersocu} from "../../classes/usersocu";

/**
 * Component used for showing the activities an user has attended
 */
@Component({
  selector: 'app-upcoming-activities',
  templateUrl: './upcoming-activities.component.html',
  styleUrls: ['./upcoming-activities.component.css']
})
export class UpcomingActivitiesComponent implements OnInit {

  /**
   * The activities the currently logged in user has attended
   */
  activities: Activity[];
  /**
   * The currently logged in user
   */
  @Input('user') user: Usersocu;

  constructor(private activityService: ActivityService,
              private authService: AuthService,
              private expiredPipe: ExpiredPipe) {
  }

  /**
   * Setup for the component
   * - Calls method getActivities to get all the activities the user has attended
   */
  ngOnInit(): void {
    this.getActivities();
  }

  /**
   * Gets all the activities the user has attended and sorts away expired activities
   */
  getActivities() {
    this.activityService.getattendedActivities(this.user.token).subscribe(data => {
      this.activities =this.expiredPipe.transform(data);
    });
  }
}
