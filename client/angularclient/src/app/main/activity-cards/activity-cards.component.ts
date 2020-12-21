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

  attendEvent(activityid: number) {
    this.activityService.attendActivity(this.loginService.getUserValue().id, activityid);
  }

  declineEvent(event) {
    //TODO: om man trycker på knappen ist för Xet så tas hela raddan bort
    // event.target.parentNode.parentNode.parentNode.hidden = true;
  //  TODO: fortsätt här så att elementet stay hidden när man uppdaterar sidan
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
