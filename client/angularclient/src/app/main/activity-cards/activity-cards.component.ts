import {Component, OnDestroy, OnInit} from '@angular/core';
import {Activity} from "../../classes/activity";
import {ActivityService} from "../../services/activity.service";
import {LoginService} from "../../services/login.service";
import {Subscription} from "rxjs";
import {Usersocu} from "../../classes/usersocu";
import {ExpiredPipe} from "../../helpers/expired.pipe";

@Component({
  selector: 'app-activity-cards',
  templateUrl: './activity-cards.component.html',
  styleUrls: ['./activity-cards.component.css']
})
export class ActivityCardsComponent implements OnInit, OnDestroy {

  activities: Activity[];
  subscription: Subscription;
  declinedActivityIDs: number[];
  user: Usersocu;

  constructor(private activityService: ActivityService,
              private loginService: LoginService,
              private expiredPipe: ExpiredPipe) {
  }

  ngOnInit(): void {
    this.user = this.loginService.getUserValue();
    this.subscription = this.activityService.getActivities(this.loginService.getUserValue().companyorganizationnumber).subscribe(activityarray => {
      activityarray.forEach((activity) => {
        this.subscription = this.activityService.getAttendees(activity.id).subscribe((data) => {
          let data2 = JSON.stringify(data);
          activity.attendees = JSON.parse(data2);
        });
      });
      this.activities = activityarray;
      this.activities = this.activities.reverse();
      this.getDeclinedActivityIDs();
      this.sortAwayDeclinedActivities();
      this.activities = this.expiredPipe.transform(this.activities);
    });

    this.getProfilePicture(4);
  }

  attendEvent(activityid: number) {
    this.activityService.attendActivity(this.loginService.getUserValue().id, activityid);
    location.reload();
  }

  declineEvent(id: number) {
    let declinedAs: number[] = JSON.parse(localStorage.getItem('declinedActivityIDs' + this.user.id));
    if (localStorage.getItem('declinedActivityIDs' + this.user.id) == null) {
      declinedAs = [id];
    } else {
      if (!declinedAs.includes(id)) {
        declinedAs.push(id);
      }
    }
    location.reload();
    localStorage.setItem('declinedActivityIDs' + this.user.id, JSON.stringify(declinedAs));
  }

  public getDeclinedActivityIDs() {
    this.declinedActivityIDs = JSON.parse(localStorage.getItem('declinedActivityIDs' + this.user.id));
  }

  sortAwayDeclinedActivities() {
    if (!(this.declinedActivityIDs == null)) {
      this.declinedActivityIDs.forEach(id => {
        this.activities.forEach(activity => {
          if (activity.id == id) {
            let index = this.activities.indexOf(activity);
            if (index > -1) {
              this.activities.splice(index, 1);
            }
          }
        });
      });
    }
  }

  getProfilePicture(id: number): string {
    return `../../../../assets/ProfilePictures/${id}.png`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
