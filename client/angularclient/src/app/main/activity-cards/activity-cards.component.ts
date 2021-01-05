import {Component, OnDestroy, OnInit} from '@angular/core';
import {Activity} from "../../classes/activity";
import {ActivityService} from "../../services/activity.service";
import {LoginService} from "../../services/login.service";
import {Subscription} from "rxjs";
import {Usersocu} from "../../classes/usersocu";
import {ExpiredPipe} from "../../helpers/expired.pipe";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditModalComponent} from "./edit-modal/edit-modal.component";


@Component({
  selector: 'app-activity-cards',
  templateUrl: './activity-cards.component.html',
  styleUrls: ['./activity-cards.component.css']
})
export class ActivityCardsComponent implements OnInit, OnDestroy {

  activities: Activity[];
  attendedActivities: Activity[];
  subscription: Subscription;
  declinedActivityIDs: number[];
  user: Usersocu;

  constructor(private activityService: ActivityService,
              private loginService: LoginService,
              private expiredPipe: ExpiredPipe,
              private modalService: NgbModal) {
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
    this.getAttendedActivities();
    this.getProfilePicture(4);
  }

  attendEvent(activityid: number) {
    this.activityService.attendActivity(this.loginService.getUserValue().id, activityid);
    location.reload();
  }

  declineEvent(activity: Activity) {
    let declinedAs: number[] = JSON.parse(localStorage.getItem('declinedActivityIDs' + this.user.id));
    if (localStorage.getItem('declinedActivityIDs' + this.user.id) == null) {
      declinedAs = [activity.id];
    } else {
      if (!declinedAs.includes(activity.id)) {
        declinedAs.push(activity.id);
      }
    }
    if (this.isUserAttending(this.user.id, activity.id)) {
      this.subscription = this.activityService.declineAttendedActivity(this.user.id, activity.id).subscribe((data) => {
        console.log(data);
      });
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
            if (index > -1 && !(activity.createdbyid == this.user.id)) {
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

  getAttendedActivities() {
    this.activityService.getattendedActivities(this.loginService.getUserValue().id).subscribe(data => {
      this.attendedActivities = this.expiredPipe.transform(data);
    });
  }

  isUserAttending(userid: number, activityid: number): boolean {
    let bool = false;
    if (!(this.attendedActivities == null)) {
      this.attendedActivities.forEach((activity) => {
          if (activity.id == activityid) {
            bool = true;
            return;
          }
        }
      );
    }
    return bool;
  }

  isUserNotAttendingButHaveCreatedEvent(activityid: number): boolean {
    let bool = false;
    if (!(this.declinedActivityIDs == null)) {
      this.declinedActivityIDs.forEach(id => {
        this.activities.forEach(activity => {
          if (activity.id == id) {
            if (activity.id == activityid) {
              bool = true;
              return;
            }
          }
        });
      });
    }
    return bool;
  }

  hasRSVPDateBeen(activity: Activity): boolean {
    let bool = false;
    let today = new Date();
    if (!(activity.rsvpdate == null)) {
      let activityDate = activity.rsvpdate;
      if (activityDate[0] < today.getFullYear()) {
        bool = true;
      } else if (activityDate[0] == today.getFullYear()) {
        if (activityDate[1] < (today.getMonth() + 1)) {
          bool = true;
        } else if (activityDate[1] == (today.getMonth() + 1)) {
          if (activityDate[2] < today.getDate()) {
            bool = true;
          }
        }
      }
    }
    return bool;
  }

  isAttendButtonDisabled(activity: Activity) {
    let isDisabled = false;
    if ((this.hasRSVPDateBeen(activity)) || (this.isUserAttending(this.user.id, activity.id))) {
      isDisabled = true;
    }
    return isDisabled;
  }

  isDeclineButtonDisabled(activity: Activity) {
    let isDisabled = false;
    if (this.declinedActivityIDs) {
      if (this.isUserNotAttendingButHaveCreatedEvent(activity.id)) {
        isDisabled = true;
      }
    }
    return isDisabled;
  }

  openEditModal(activity: Activity){
    let modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.activity = activity;
    // modalRef['activity'] = activity;

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


