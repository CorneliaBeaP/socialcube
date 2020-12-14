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
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
