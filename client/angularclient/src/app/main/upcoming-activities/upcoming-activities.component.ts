import {Component, OnInit} from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {Activity} from "../../classes/activity";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-upcoming-activities',
  templateUrl: './upcoming-activities.component.html',
  styleUrls: ['./upcoming-activities.component.css']
})
export class UpcomingActivitiesComponent implements OnInit {
  activities: Activity[];

  constructor(private activityService: ActivityService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    console.log('getActivities');
    this.activityService.getattendedActivities(this.loginService.getUserValue().id).subscribe(data => {
      this.activities = data;
      console.log(this.activities);
    });
  }

}
