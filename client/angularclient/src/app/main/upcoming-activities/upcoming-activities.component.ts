import {Component, OnInit} from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {Activity} from "../../classes/activity";
import {LoginService} from "../../services/login.service";
import {ExpiredPipe} from "../../helpers/expired.pipe";

@Component({
  selector: 'app-upcoming-activities',
  templateUrl: './upcoming-activities.component.html',
  styleUrls: ['./upcoming-activities.component.css']
})
export class UpcomingActivitiesComponent implements OnInit {
  activities: Activity[];

  constructor(private activityService: ActivityService,
              private loginService: LoginService,
              private expiredPipe: ExpiredPipe) {
  }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    this.activityService.getattendedActivities(this.loginService.getUserValue().id).subscribe(data => {
      this.activities =this.expiredPipe.transform(data);
    });
  }
}
