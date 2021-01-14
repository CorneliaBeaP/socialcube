import {Component, Input, OnInit} from '@angular/core';
import {Usersocu} from "../../classes/usersocu";
import {Subscription} from "rxjs";
import {ActivityService} from "../../services/activity.service";
import {AuthService} from "../../services/auth.service";
import {Activity} from "../../classes/activity";
import {CurrentmonthPipe} from "../../helpers/pipes/currentmonth.pipe";
import {CancelledPipe} from "../../helpers/pipes/cancelled.pipe";
import {ExpiredPipe} from "../../helpers/pipes/expired.pipe";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input('user') user: Usersocu;
  subscription: Subscription;
  attendedActivities: Activity[];
  activitiesThisMonth: Activity[];

  constructor(private authService: AuthService,
              private activityService: ActivityService,
              private currentmonthPipe: CurrentmonthPipe,
              private cancelledPipe: CancelledPipe,
              private expiredPipe: ExpiredPipe) {
  }

  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    this.subscription = this.activityService.getattendedActivities(this.authService.getToken()).subscribe((data) => {
      this.attendedActivities = data;
      this.getAttendedActivitiesThisMonth(this.attendedActivities);
      this.getNameOfMonth();
    })
  }

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

  getAttendedActivitiesThisMonth(activities: Activity[]) {
    this.activitiesThisMonth = this.currentmonthPipe.transform(activities);
    this.activitiesThisMonth = this.cancelledPipe.transform(this.activitiesThisMonth);
    this.activitiesThisMonth = this.expiredPipe.transform(this.activitiesThisMonth);
  }
}
