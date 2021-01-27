import {Component, Input, OnInit} from '@angular/core';
import {Usersocu} from "../../classes/usersocu";
import {Subscription} from "rxjs";
import {ActivityService} from "../../services/activity.service";
import {AuthService} from "../../services/auth.service";
import {Activity} from "../../classes/activity";
import {CurrentmonthPipe} from "../../helpers/pipes/currentmonth.pipe";
import {CancelledPipe} from "../../helpers/pipes/cancelled.pipe";
import {ExpiredPipe} from "../../helpers/pipes/expired.pipe";

/**
 * Component used for showing the activities that the currently logged in user has attended and that takes place in the current month
 */
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  /**
   * The currently logged in user
   */
  @Input('user') user: Usersocu;

  /**
   * Subscription to receive and send information to and from the backend
   */
  subscription: Subscription;

  /**
   * List of activities that the currently logged in user has attended
   */
  attendedActivities: Activity[];

  /**
   * Activities that takes place the current month
   */
  activitiesThisMonth: Activity[];

  constructor(private authService: AuthService,
              private activityService: ActivityService,
              private currentmonthPipe: CurrentmonthPipe,
              private cancelledPipe: CancelledPipe,
              private expiredPipe: ExpiredPipe) {
  }

  /**
   * Calls the method setUp
   */
  ngOnInit(): void {
    this.setUp();
  }

  /**
   * - Gets the attended activities for the logged in user
   * - Gets the attended activities for the current month
   * - Gets the name of the current month
   */
  setUp() {
    this.subscription = this.activityService.getattendedActivities(this.authService.getToken()).subscribe((data) => {
      this.attendedActivities = data;
      this.getAttendedActivitiesThisMonth(this.attendedActivities);
      this.getNameOfMonth();
    })
  }

  /**
   * Gets the name of the current month
   */
  getNameOfMonth(): string {
    let today = new Date();
    let thismonth = today.getMonth() + 1;
    let name = '';
    if (thismonth == 1) {
      name = 'januari';
    } else if (thismonth == 2) {
      name = 'februari';
    } else if (thismonth == 3) {
      name = 'mars';
    } else if (thismonth == 4) {
      name = 'april';
    } else if (thismonth == 5) {
      name = 'maj';
    } else if (thismonth == 6) {
      name = 'juni';
    } else if (thismonth == 7) {
      name = 'juli';
    } else if (thismonth == 8) {
      name = 'augusti';
    } else if (thismonth == 9) {
      name = 'september';
    } else if (thismonth == 10) {
      name = 'oktober';
    } else if (thismonth == 11) {
      name = 'november';
    } else if (thismonth == 12) {
      name = 'december';
    }
    return name;
  }

  /**
   * Sorts out activities that has expired, that are cancelled or that are not taking place the current month
   * @param activities an array of attended activities for the logged in user
   */
  getAttendedActivitiesThisMonth(activities: Activity[]) {
    this.activitiesThisMonth = this.currentmonthPipe.transform(activities);
    this.activitiesThisMonth = this.cancelledPipe.transform(this.activitiesThisMonth);
    this.activitiesThisMonth = this.expiredPipe.transform(this.activitiesThisMonth);
  }
}
