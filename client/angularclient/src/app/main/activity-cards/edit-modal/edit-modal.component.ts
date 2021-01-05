import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "../../../classes/activity";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Response} from "../../../classes/response";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  activity: Activity;
  form: FormGroup;
  updatedActivity: Activity;
  errorMessageActivityDate = '';
  errorMessageRSVPDate = '';

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) {
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
    this.form = this.formBuilder.group({
      activitytype: [this.updatedActivity.activitytype, Validators.required],
      activitydateyear: [this.updatedActivity.activitydate[0], Validators.required],
      activitydatemonth: [this.updatedActivity.activitydate[1], Validators.required],
      activitydatedate: [this.updatedActivity.activitydate[2], Validators.required],
      activitytimehour: [this.updatedActivity.activitydate[3], Validators.required],
      activitytimeminute: [`${extraZero}${this.updatedActivity.activitydate[4]}`, Validators.required],
      rsvpdateyear: [this.updatedActivity.rsvpdate[0]],
      rsvpdatemonth: [this.updatedActivity.rsvpdate[1]],
      rsvpdatedate: [this.updatedActivity.rsvpdate[2]],
      descriptionsocu: [this.updatedActivity.descriptionsocu, Validators.required],
      locationname: [this.updatedActivity.locationname, Validators.required],
      locationaddress: [this.updatedActivity.locationaddress, Validators.required]
    });
  }

  onSave() {
    this.errorMessageRSVPDate = '';
    this.errorMessageActivityDate = '';
    if (this.form.invalid || !this.isFormOk()) {
      console.log('invalid');
      return;
    } else {
      this.copyValuesFromForm();
    }
  }

  copyValuesFromForm() {
    this.updatedActivity.activitytype = this.form.get('activitytype').value;
    this.updatedActivity.activitydate[0] = this.form.get('activitydateyear').value;
    this.updatedActivity.activitydate[1] = this.form.get('activitydatemonth').value;
    this.updatedActivity.activitydate[2] = this.form.get('activitydatedate').value;
    this.updatedActivity.activitydate[3] = this.form.get('activitytimehour').value;
    this.updatedActivity.activitydate[4] = this.form.get('activitytimeminute').value;
    this.updatedActivity.rsvpdate[0] = this.form.get('rsvpdateyear').value;
    this.updatedActivity.rsvpdate[1] = this.form.get('rsvpdatemonth').value;
    this.updatedActivity.rsvpdate[2] = this.form.get('rsvpdatedate').value;
    this.updatedActivity.descriptionsocu = this.form.get('descriptionsocu').value;
    this.updatedActivity.locationname = this.form.get('locationname').value;
    this.updatedActivity.locationaddress = this.form.get('locationaddress').value;
  
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

    return isFormOk;
  }
}
