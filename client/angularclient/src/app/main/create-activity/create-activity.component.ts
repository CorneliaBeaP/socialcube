import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Activity} from "../../classes/activity";
import {ActivityService} from "../../services/activity.service";
import {AuthService} from "../../services/auth.service";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {APP_DATE_FORMATS, AppDateAdapter} from "../../helpers/adapters/app-date-adapter";
import {Subscription} from "rxjs";
import {Usersocu} from "../../classes/usersocu";


@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class CreateActivityComponent implements OnInit, OnDestroy {

  showPlanActivity = false;

  form: FormGroup;
  subscription: Subscription;
  submitbuttonclicked = false;
  @Input('user') user: Usersocu;

  tooltiprsvp = "Här fyller du i datumet man senast behöver tacka ja till eventet. Om detta inte är aktuellt kan du lämna fältet tomt.";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      activitytype: ['', Validators.required],
      activitydate: ['', Validators.required],
      activitytime: ['', Validators.required],
      rsvpdate: [''],
      descriptionsocu: ['', Validators.required],
      locationname: ['', Validators.required],
      locationaddress: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.form.invalid) {
      this.submitbuttonclicked = true;
      return;
    }
    let activity = new Activity();
    let date = new Date(this.form.get('activitydate').value);
    let time = this.form.get('activitytime').value;
    let hours = time.toString().substring(0, 2);
    let hours2: number = parseInt(hours) + 1;
    let minutes = time.toString().substring(3, 5);
    let concatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours2, minutes);

    activity.descriptionsocu = this.form.get('descriptionsocu').value;
    activity.activitytype = this.form.get('activitytype').value;
    activity.locationname = this.form.get('locationname').value;
    activity.locationaddress = this.form.get('locationaddress').value;
    activity.createdbyid = this.user.id;
    activity.companyorganizationnumber = this.user.companyorganizationnumber;
    activity.activitydate = concatDate;
    activity.rsvpdate = this.form.get('rsvpdate').value;
    activity.cancelled = false;
    let today = new Date();
    activity.createddate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours() + 1, today.getMinutes());
    console.log(new Date());
    console.log(activity);

    this.subscription = this.activityService.createActivity(activity).subscribe(next => {
      console.log(next);
    });
    this.form.reset();
    location.reload();
  }

  ngOnDestroy(): void {
  }
}
