import {Component, OnDestroy, OnInit} from '@angular/core';
import {Activity} from "../../../classes/activity";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivityService} from "../../../services/activity.service";
import {Subscription} from "rxjs";

/**
 * Modal for editing an activity
 */
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit, OnDestroy {

  /**
   * The current activity
   */
  activity: Activity;
  /**
   * Formgroup for input fields
   */
  form: FormGroup;
  /**
   * The new information sent to the backend
   */
  updatedActivity: Activity;
  /**
   * Eventual error message if something is incorrect with the new date of the activity
   */
  errorMessageActivityDate = '';
  /**
   * Eventual error message if something is incorrect with the new RSVP date of the activity
   */
  errorMessageRSVPDate = '';
  /**
   * Eventual error message if something is incorrect with the new time of the activity
   */
  errorMessageTime = '';
  /**
   * Subscription to receive and send information to and from the backend
   */
  subscription: Subscription;
  /**
   * Boolean if the user tries to cancel an activity, showing a confirmation message
   */
  cancelactivity = false;
  /**
   * Boolean if the user tries to delete an activity, showing a confirmation message
   */
  deleteactivity = false;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private activityService: ActivityService) {
  }

  /**
   * Setup for the component
   * - Creates the variable updatedActivity and copies all the information from the original activity to it
   * - Creates the form for the inputs in the edit modal
   */
  ngOnInit(): void {
    this.updatedActivity = new Activity();
    Object.assign(this.updatedActivity, this.activity);
    this.createForm();
  }

  /**
   * Creates the form for the inputs in the edit modal
   */
  createForm() {
    let extraZero = '';
    if (this.updatedActivity.activitydate[4] < 10) {
      extraZero = '0';
    }

    let rsvpyear;
    let rsvpmonth;
    let rsvpdate;
    if (this.updatedActivity.rsvpdate == null) {
      rsvpyear = '';
      rsvpmonth = '';
      rsvpdate = '';
    } else {
      rsvpyear = this.updatedActivity.rsvpdate[0];
      rsvpmonth = this.updatedActivity.rsvpdate[1];
      rsvpdate = this.updatedActivity.rsvpdate[2];
    }

    this.form = this.formBuilder.group({
      activitytype: [this.updatedActivity.activitytype, Validators.required],
      activitydateyear: [this.updatedActivity.activitydate[0], Validators.required],
      activitydatemonth: [this.updatedActivity.activitydate[1], Validators.required],
      activitydatedate: [this.updatedActivity.activitydate[2], Validators.required],
      activitytimehour: [this.updatedActivity.activitydate[3], Validators.required],
      activitytimeminute: [`${extraZero}${this.updatedActivity.activitydate[4]}`, Validators.required],
      rsvpdateyear: [rsvpyear],
      rsvpdatemonth: [rsvpmonth],
      rsvpdatedate: [rsvpdate],
      descriptionsocu: [this.updatedActivity.descriptionsocu, Validators.required],
      locationname: [this.updatedActivity.locationname, Validators.required],
      locationaddress: [this.updatedActivity.locationaddress, Validators.required]
    });
  }

  /**
   *Forwards the changed inputs to the backend to be saved in the database if anything has been changed, if the form is invalid the user stays in the modal
   */
  onSave() {
    this.errorMessageRSVPDate = '';
    this.errorMessageActivityDate = '';
    if (this.form.invalid || !this.isFormOk()) {
      return;
    } else {
      if (this.form.dirty) {
        this.copyValuesFromFormAndSaveActivity()
      } else {
        this.activeModal.close();
      }
    }
  }

  /**
   * Copies the values from the form into an Activity-object that can be sent to the backend
   */
  copyValuesFromFormAndSaveActivity() {
    this.updatedActivity.activitytype = this.form.get('activitytype').value;
    this.updatedActivity.activitydate[0] = this.form.get('activitydateyear').value;
    this.updatedActivity.activitydate[1] = this.form.get('activitydatemonth').value;
    this.updatedActivity.activitydate[2] = this.form.get('activitydatedate').value;
    this.updatedActivity.activitydate[3] = this.form.get('activitytimehour').value;
    this.updatedActivity.activitydate[4] = Number(this.form.get('activitytimeminute').value);
    if (!(this.updatedActivity.rsvpdate == null)) {
      this.updatedActivity.rsvpdate[0] = this.form.get('rsvpdateyear').value;
      this.updatedActivity.rsvpdate[1] = this.form.get('rsvpdatemonth').value;
      this.updatedActivity.rsvpdate[2] = this.form.get('rsvpdatedate').value;
    }
    this.updatedActivity.descriptionsocu = this.form.get('descriptionsocu').value;
    this.updatedActivity.locationname = this.form.get('locationname').value;
    this.updatedActivity.locationaddress = this.form.get('locationaddress').value;
    this.subscription = this.activityService.updateActivity(this.updatedActivity).subscribe((data) => {
      console.log(data);
    });
    this.activeModal.close();
    location.reload();
  }

  /**
   * Checks if the changed inputs are valid:
   * checks that the date of the activity hasn't been changed do a date that has already been
   * checks that the rsvpdate hasn't been changed do a date that has already been
   * checks that the time of the activity is a valid time
   *
   */
  isFormOk(): boolean {
    let today = new Date();
    let isFormOk = true;

    //Kontroller för datum för aktiviteten
    if (this.form.get('activitydateyear').value < today.getFullYear()) {
      isFormOk = false;
      this.errorMessageActivityDate = `Datumet för aktiviteten har redan varit`;
    } else if (this.form.get('activitydateyear').value == today.getFullYear()) {
      if (this.form.get('activitydatemonth').value < (today.getMonth() + 1)) {
        isFormOk = false;
        this.errorMessageActivityDate = `Datumet för aktiviteten har redan varit`;
      } else if (this.form.get('activitydatemonth').value == (today.getMonth() + 1)) {
        if (this.form.get('activitydatedate').value < today.getDate()) {
          isFormOk = false;
          this.errorMessageActivityDate = `Datumet för aktiviteten har redan varit`;
        }
      }
    }

    if ((this.form.get('activitydatemonth').value > 12) || (this.form.get('activitydatedate').value > 31)) {
      isFormOk = false;
      this.errorMessageActivityDate = 'Felaktigt datum';
    }

    //Kontroller för OSA-datum
    if (this.form.get('rsvpdateyear').dirty || this.form.get('rsvpdatemonth').dirty || this.form.get('rsvpdatedate').dirty) {
      if (this.form.get('rsvpdateyear').value && this.form.get('rsvpdatemonth').value && this.form.get('rsvpdatedate').value) {
        if (this.form.get('rsvpdateyear').value < today.getFullYear()) {
          isFormOk = false;
          this.errorMessageRSVPDate = `OSA-datumet för aktiviteten har redan varit`;
        } else if (this.form.get('rsvpdateyear').value == today.getFullYear()) {
          if (this.form.get('rsvpdatemonth').value < (today.getMonth() + 1)) {
            isFormOk = false;
            this.errorMessageRSVPDate = `OSA-datumet för aktiviteten har redan varit`;
          } else if (this.form.get('rsvpdatemonth').value == (today.getMonth() + 1)) {
            if (this.form.get('rsvpdatedate').value < today.getDate()) {
              isFormOk = false;
              this.errorMessageRSVPDate = `OSA-datumet för aktiviteten har redan varit`;
            }
          }
        }

        if ((this.form.get('rsvpdatemonth').value > 12) || (this.form.get('rsvpdatedate').value > 31)) {
          isFormOk = false;
          this.errorMessageRSVPDate = 'Felaktigt datum';
        }
      }
    }

    //Kontroller för tid
    if (this.form.get('activitytimehour').dirty || this.form.get('activitytimeminute')) {
      if (this.form.get('activitytimehour').value > 23 || this.form.get('activitytimeminute').value > 59) {
        isFormOk = false;
        this.errorMessageTime = 'Felaktigt klockslag'
      }
    }

    return isFormOk;
  }

  /**
   * Forwards the information about an activity being cancelled to the backend to be updated in the database, then closes the modal
   * @param activity the activity that is being cancelled
   */
  cancelActivity(activity: Activity) {
    this.subscription = this.activityService.cancelActivity(activity.id).subscribe((data) => {
      console.log(data);
    });
    this.activeModal.close();
    location.reload();
  }

  /**
   * Forwards the information about an activity being deleted to the backend to be removed from the database, then closes the modal
   */
  deleteActivity() {
    this.subscription = this.activityService.deleteActivity(this.activity.id).subscribe();
    this.activeModal.close();
    location.reload();
  }

  /**
   * Unsubscribes from any subscriptions to prevent memory leak
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
