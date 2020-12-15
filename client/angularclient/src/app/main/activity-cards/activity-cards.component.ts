import {Component, OnDestroy, OnInit} from '@angular/core';
import {Activity} from "../../classes/activity";
import {ActivityService} from "../../services/activity.service";
import {LoginService} from "../../services/login.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-activity-cards',
  templateUrl: './activity-cards.component.html',
  styleUrls: ['./activity-cards.component.css']
})
export class ActivityCardsComponent implements OnInit, OnDestroy {

  activities: Activity[];
  subscription: Subscription;

  constructor(private activityService: ActivityService, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.subscription = this.activityService.getActivities(this.loginService.getUserValue().companyorganizationnumber).subscribe(activityarray => {
      this.activities = activityarray;
      this.sortByCreatedDate();
      this.activities = this.activities.reverse();
    });

  }

  public sortByCreatedDate(): void {

    this.activities.sort(function (ac1, ac2) {
      let ac1date = new Date(ac1.createddate).getTime();
      let ac2date = new Date(ac2.createddate).getTime();
      return ac1date > ac2date ? -1 : 1;
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
