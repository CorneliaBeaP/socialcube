import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "../../../classes/activity";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  activity: Activity;
  form: FormGroup;
  subscription: Subscription;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    let extraZero = '';
    if(this.activity.activitydate[4]<10){
      extraZero = '0';
    }
    this.form = this.formBuilder.group({
      activitytype: [this.activity.activitytype, Validators.required],
      activitydateyear: [this.activity.activitydate[0]],
      activitydatemonth: [this.activity.activitydate[1]],
      activitydatedate: [this.activity.activitydate[2]],
      activitytimehour: [this.activity.activitydate[3], Validators.required],
      activitytimeminute: [`${extraZero}${this.activity.activitydate[4]}`, Validators.required],
      rsvpdateyear: [this.activity.rsvpdate[0]],
      rsvpdatemonth: [this.activity.rsvpdate[1]],
      rsvpdatedate: [this.activity.rsvpdate[2]],
      descriptionsocu: [this.activity.descriptionsocu, Validators.required],
      locationname: [this.activity.locationname, Validators.required],
      locationaddress: [this.activity.locationaddress, Validators.required]
    });

  }

}
