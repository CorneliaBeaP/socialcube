import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Activity} from "../../classes/activity";
import {ActivityService} from "../../services/activity.service";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {APP_DATE_FORMATS, AppDateAdapter} from "../../helpers/adapters/app-date-adapter";
import {Subscription} from "rxjs";
import {Usersocu} from "../../classes/usersocu";

/**
 * Component used for creating a new activity by an user
 */
@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class CreateActivityComponent implements OnInit{

  /**
   * Boolean if the whole component should be expanded or contracted
   */
  showPlanActivity = false;

  /**
   * Formgroup for the input fields
   */
  form: FormGroup;

  /**
   * Subscription to receive and send information to and from the backend
   */
  subscription: Subscription;

  /**
   * Boolean if the "Save"-button has been clicked
   */
  submitbuttonclicked = false;

  /**
   * The currently logged in user
   */
  @Input('user') user: Usersocu;

  /**
   * Tooltip next to the RSVP input field
   */
  tooltiprsvp = 'Här fyller du i datumet man senast behöver tacka ja till eventet. Om detta inte är aktuellt kan du lämna fältet tomt.';

  /**
   * Tooltip next to the Activity Type input field
   */
  tooltiptype = 'Vad är det för rolig slags aktivitet du vill skapa? Kanske en julfest, fika, lunch eller After Work?';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private activityService: ActivityService) {
  }

  /**
   * Setup for the component
   * - Calls the method to create the form
   */
  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Creates the form the the user can create an activity
   */
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

  /**
   * Takes the information provided in the form and forwards it to the backend
   */
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

    this.subscription = this.activityService.createActivity(activity).subscribe(next => {
    });
    location.reload();
  }
}
