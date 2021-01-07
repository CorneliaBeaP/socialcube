import {Component, OnInit} from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {Activity} from "../../classes/activity";
import {AuthService} from "../../services/auth.service";
import {ExpiredPipe} from "../../helpers/expired.pipe";

@Component({
  selector: 'app-upcoming-activities',
  templateUrl: './upcoming-activities.component.html',
  styleUrls: ['./upcoming-activities.component.css']
})
export class UpcomingActivitiesComponent implements OnInit {
  activities: Activity[];

  constructor(private activityService: ActivityService,
              private authService: AuthService,
              private expiredPipe: ExpiredPipe) {
  }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    this.activityService.getattendedActivities(this.authService.getUserValue().id).subscribe(data => {
      this.activities =this.expiredPipe.transform(data);
    });
  }
}
