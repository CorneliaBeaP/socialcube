import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Activity} from "../../../classes/activity";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivityService} from "../../../services/activity.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit, OnDestroy {

  activity: Activity;
  form: FormGroup;
  updatedActivity: Activity;
  errorMessageActivityDate = '';
  errorMessageRSVPDate = '';
  subscription: Subscription;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.updatedActivity = new Activity();
    Object.assign(this.updatedActivity, this.activity);
    this.createForm();
  }

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

  onSave() {
    this.errorMessageRSVPDate = '';
    this.errorMessageActivityDate = '';
    if (this.form.invalid || !this.isFormOk()) {
      console.log(this.form.invalid);
      console.log(this.isFormOk());
      console.log(this.errorMessageActivityDate);
      console.log(this.errorMessageRSVPDate);
      console.log('invalid');
      return;
    } else {
      this.copyValuesFromFormAndSaveActivity();
    }
  }

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

  isFormOk(): boolean {
    let today = new Date();
    let isFormOk = true;

    //Kontroller för datum för aktiviteten
    if (this.form.get('activitydateyear').value < today.getFullYear()) {
      isFormOk = false;
      this.errorMessageActivityDate = `Året för aktiviteten har redan varit`;
    } else if (this.form.get('activitydateyear').value == today.getFullYear()) {
      if (this.form.get('activitydatemonth').value < (today.getMonth() + 1)) {
        isFormOk = false;
        this.errorMessageActivityDate = `Månaden för aktiviteten har redan varit`;
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

    return isFormOk;
  }

  cancelActivity(activity: Activity) {
    this.subscription = this.activityService.cancelActivity(activity.id).subscribe((data) => {
      console.log(data);
    });
    this.activeModal.close();
    location.reload();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
