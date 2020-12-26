import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {UserService} from "../../services/user.service";
import {LoginService} from "../../services/login.service";
import {Usersocu} from "../../classes/usersocu";
import {Activity} from "../../classes/activity";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-current-activities',
  templateUrl: './current-activities.component.html',
  styleUrls: ['./current-activities.component.css']
})
export class CurrentActivitiesComponent implements OnInit, OnDestroy {

  showCurrentActivities = false;
  currentActivities: Activity[];
  user: Usersocu;
  subscription: Subscription;

  constructor(private activityService: ActivityService,
              private userService: UserService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.user = this.loginService.getUserValue();
    this.getActivities();
  }

  getActivities() {
    this.subscription = this.activityService.getActivities(this.user.companyorganizationnumber).subscribe(next => {
      this.currentActivities = this.sortAwayExpiredActivities(next);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
