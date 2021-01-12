import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Activity} from "../../classes/activity";
import {ActivityService} from "../../services/activity.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {Usersocu} from "../../classes/usersocu";
import {ExpiredPipe} from "../../helpers/pipes/expired.pipe";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditModalComponent} from "./edit-modal/edit-modal.component";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-activity-cards',
  templateUrl: './activity-cards.component.html',
  styleUrls: ['./activity-cards.component.css']
})
export class ActivityCardsComponent implements OnInit, OnDestroy {

  activities: Activity[];
  attendedActivities: Activity[];
  subscription: Subscription;
  declinedActivities: Activity[];
  @Input('user') user: Usersocu;

  constructor(private activityService: ActivityService,
              private authService: AuthService,
              private userService: UserService,
              private expiredPipe: ExpiredPipe,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
     this.subscription = this.activityService.getActivities(this.user.token).subscribe(activityarray => {
        activityarray.forEach((activity) => {
          this.subscription = this.activityService.getAttendees(activity.id).subscribe((data) => {
            let data2 = JSON.stringify(data);
            activity.attendees = JSON.parse(data2);
          });
        });
        this.activities = activityarray;
        this.activities = this.activities.reverse();
        this.getDeclinedActivities();
        this.activities = this.expiredPipe.transform(this.activities);
      });
      this.getAttendedActivities();
      this.getProfilePicture(this.user.id);
  }

  attendEvent(activityid: number) {
    if(this.isUserNotAttendingButHaveCreatedEvent(activityid)){
      this.activityService.attendDeclinedActivity(this.authService.getToken(), activityid);
    }else{
      this.activityService.attendActivity(this.authService.getToken(), activityid);
    }
    location.reload();
  }

  declineEvent(activity: Activity) {
    if (this.isUserAttending(this.user.id, activity.id)) {
      this.subscription = this.activityService.declineAttendedActivity(this.user.id, activity.id).subscribe((data) => {
        console.log(data);
      });
    } else {
      this.subscription = this.activityService.declineActivity(this.user.id, activity.id).subscribe((data) => {
        console.log(data);
      });
    }
    location.reload();
  }

  public getDeclinedActivities() {
    this.subscription = this.activityService.getDeclinedActivities(this.authService.getToken()).subscribe((data) => {
      let data2 = JSON.stringify(data);
      this.declinedActivities = JSON.parse(data2);
      this.sortAwayDeclinedActivities();
    });
  }

  sortAwayDeclinedActivities() {
    if (this.declinedActivities) {
      this.declinedActivities.forEach(declinedActivity => {
        this.activities.forEach(activity => {
          if (activity.id == declinedActivity.id) {
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
    this.activityService.getattendedActivities(this.authService.getToken()).subscribe(data => {
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
    if (!(this.declinedActivities == null)) {
      this.declinedActivities.forEach(declinedActivity => {
        this.activities.forEach(activity => {
          if (activity.id == declinedActivity.id) {
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
    if (activity.cancelled) {
      isDisabled = true;
    }
    return isDisabled;
  }

  isDeclineButtonDisabled(activity: Activity) {
    let isDisabled = false;
    if (this.declinedActivities) {
      if (this.isUserNotAttendingButHaveCreatedEvent(activity.id)) {
        isDisabled = true;
      }
    }
    if (activity.cancelled) {
      isDisabled = true;
    }
    return isDisabled;
  }

  isEditButtonDisabled(activity: Activity) {
    let isDisabled = false;
    if (activity.cancelled) {
      isDisabled = true;
    }
    return isDisabled;
  }

  openEditModal(activity: Activity) {
    let modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.activity = activity;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


