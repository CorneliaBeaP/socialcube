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

/**
 * Component used for displaying cards of each activity
 */
@Component({
  selector: 'app-activity-cards',
  templateUrl: './activity-cards.component.html',
  styleUrls: ['./activity-cards.component.css']
})
export class ActivityCardsComponent implements OnInit, OnDestroy {

  /**
   * List of activities that should be shown registered on the organization number the currently logged in user works at
   */
  activities: Activity[];
  /**
   * List of activities that the currently logged in user has attended
   */
  attendedActivities: Activity[];
  /**
   * Subscription to receive and send information to and from the backend
   */
  subscription: Subscription;
  /**
   * List of activities that the currently logged in user has declined
   */
  declinedActivities: Activity[];
  /**
   * The currently logged in user
   */
  @Input('user') user: Usersocu;

  constructor(private activityService: ActivityService,
              private authService: AuthService,
              private userService: UserService,
              private expiredPipe: ExpiredPipe,
              private modalService: NgbModal) {
  }

  /**
   * Calls the method setUp
   */
  ngOnInit(): void {
    this.setUp();
  }

  /**
   * - Gets all the activities from the backend
   * - Gets the attendees for each activity
   * - Sorts away expired activities
   * - Gets attended activities for the logged in user
   * - Gets the profile picture for the logged in user
   */
  setUp() {
    this.subscription = this.activityService.getActivities(this.user.token).subscribe(activityarray => {
      activityarray.forEach((activity) => {
        this.subscription = this.activityService.getAttendees(activity.id).subscribe((data) => {
          let data2 = JSON.stringify(data);
          activity.attendees = JSON.parse(data2);
        });
      });
      activityarray.forEach((activity) => {
        if (!activity.createdBy) {
          let usersocu: Usersocu = new Usersocu();
          usersocu.id = 0;
          usersocu.name = "Borttagen användare";
          activity.createdBy = usersocu;
          activity.createdbyid = usersocu.id;
        }
      });
      this.activities = activityarray;
      this.activities = this.activities.reverse();
      this.getDeclinedActivities();
      this.activities = this.expiredPipe.transform(this.activities);
    });
    this.getAttendedActivities();
    this.getProfilePicture(this.user.id);
  }

  /**
   * Forwards information to the backend that a user has attended an activity
   * @param activityid the id of the activity
   */
  attendEvent(activityid: number) {
    if (this.isUserNotAttendingButHaveCreatedEvent(activityid)) {
      this.activityService.attendDeclinedActivity(this.authService.getToken(), activityid);
    } else {
      this.activityService.attendActivity(this.authService.getToken(), activityid);
    }
    location.reload();
  }

  /**
   * Forwards information to the backend that a user has declined an activity
   * @param activity the activity
   */
  declineEvent(activity: Activity) {
    if (this.isUserAttending(this.user.id, activity.id)) {
      this.subscription = this.activityService.declineAttendedActivity(this.authService.getToken(), activity.id).subscribe((data) => {
        console.log(data);
      });
    } else {
      this.subscription = this.activityService.declineActivity(this.authService.getToken(), activity.id).subscribe((data) => {
        console.log(data);
      });
    }
    location.reload();
  }

  /**
   * Recieves all the declined activities for the user from the backend
   */
  public getDeclinedActivities() {
    this.subscription = this.activityService.getDeclinedActivities(this.authService.getToken()).subscribe((data) => {
      let data2 = JSON.stringify(data);
      this.declinedActivities = JSON.parse(data2);
      this.sortAwayDeclinedActivities();
    });
  }

  /**
   * Sorts away declined activities from the array with all the activities that is shown in the activity cards
   */
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

  /**
   * Gets the url for the profile picture for a specific user
   * @param id the id of the user
   */
  getProfilePicture(id: number): string {
    return `../../../../assets/ProfilePictures/${id}.png`;
  }

  /**
   * Receives all the attended activities for the logged in user and sorts away the expired ones
   */
  getAttendedActivities() {
    this.activityService.getattendedActivities(this.authService.getToken()).subscribe(data => {
      this.attendedActivities = this.expiredPipe.transform(data);
    });
  }

  /**
   * Checks if an user is attending a specific activity
   * @param userid the id of the user
   * @param activityid the id of the activity
   * @returns a boolean if the user is attending or not, true if the user is attending, false if not
   */
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

  /**
   * Checks if the user is not attending a specific activity but have created it
   * @param activityid the id of the activity
   * @returns a boolean if the user is not attending but have created the activity
   */
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

  /**
   * Checks if the rsvp-date has already been for a specific activity
   * @param activity the id of the activity
   * @returns a boolean if the date has been or not
   */
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

  /**
   * Checks if the attend button should be disabled on the card for a specific activity and disables it in that case
   * @param activity the id of the activity
   */
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

  /**
   * Checks if the decline button should be disabled on the card for a specific activity and disables it in that case
   * @param activity the id of the activity
   */
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

  /**
   * Checks if the edit button should be disabled on the card for a specific activity and disables it in that case
   * @param activity the id of the activity
   */
  isEditButtonDisabled(activity: Activity) {
    let isDisabled = false;
    if (activity.cancelled) {
      isDisabled = true;
    }
    return isDisabled;
  }

  /**
   * Opens the modal to edit an activity
   * @param activity
   */
  openEditModal(activity: Activity) {
    let modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.activity = activity;
  }

  /**
   * Shows the default profile picture if the url for the users profile picture cant be found
   * @param event the source event
   */
  errorHandler(event) {
    event.target.src = `../../../../assets/ProfilePictures/default.png`;
  }

  /**
   * Returns the string that should be shown when hovering over an users profile picture
   * @param name the name of the user
   * @param department the deparment where the user works
   */
  getTooltipAttendee(name: string, department: string): string{
   let returnstring = '';
   if(department){
     returnstring = `${name} (${department})`;
   }else{
     returnstring = name;
   }
    return returnstring;
  }

  /**
   * Unsubscribes from any subscriptions to prevent memory leak
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


