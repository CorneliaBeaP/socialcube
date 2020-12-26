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
    this.activityService.getattendedActivities(this.loginService.getUserValue().id).subscribe(data => {
      this.activities =this.sortAwayExpiredActivities(data);
    });
  }
  sortAwayExpiredActivities(list: Activity[]) {
    let today = new Date();
    let itemsToRemove = [];
    list.forEach((activity) => {
      let activityDate = activity.activitydate;
      if (activityDate[0] < today.getFullYear()) {
        itemsToRemove.push(activity);
      } else if (activityDate[0] == today.getFullYear()) {
        if (activityDate[1] < (today.getMonth() + 1)) {
          itemsToRemove.push(activity);
        } else if (activityDate[1] == (today.getMonth() + 1)) {
          if (activityDate[2] < today.getDate()) {
            itemsToRemove.push(activity);
          }
        }
      }
    });
    itemsToRemove.forEach((activity) => {
      list.splice(list.indexOf(activity), 1);
    });
    return list;
  }

}
