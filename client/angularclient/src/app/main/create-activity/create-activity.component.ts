import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Usersocu} from "../../classes/usersocu";
import {Activity} from "../../classes/activity";
import {Location} from "../../classes/location";
import {Time} from "@angular/common";
import {min} from "rxjs/operators";


@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  showPlanActivity = false;
  showCurrentActivities = false;

  form: FormGroup;
  activitytype: string;
  activitytime: Time;
  activitydate: Date;
  rsvpdate: Date;
  descriptionsocu: string;
  createdby: Usersocu;
  locationname: string;
  locationaddress: string;

  // location: Location;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      activitytype: ['', Validators.required],
      activitydate: ['', Validators.required],
      activitytime: ['', Validators.required],
      rsvpdate: ['', Validators.required],
      descriptionsocu: ['', Validators.required],
      locationname: ['', Validators.required],
      locationaddress: ['', Validators.required]
    });

  }

  onSubmit() {
    // if (this.form.invalid) {
    //   return;
    // }
    // this.activitytype = this.form.get('activitytype').value;
    // this.activitydate = this.form.get('activitydate').value;
    // this.rsvpdate = this.form.get('rsvpdate').value;
    // this.descriptionsocu = this.form.get('description').value;
    // this.locationname = this.form.get('locationname').value;
    // this.locationaddress = this.form.get('locationaddress').value;


    let location = new Location();
    location.name = this.form.get('locationname').value;
    location.address = this.form.get('locationaddress').value;

    let date = new Date(this.form.get('activitydate').value);
    let time = this.form.get('activitytime').value;
    let hours = time.toString().substring(0, 2);
    let minutes = time.toString().substring(3, 5);
    let concatDate = new Date(date.getFullYear(), date.getMonth(), date.getDay(), hours, minutes);

    let activity= new Activity();
    activity.activitytype = this.form.get('activitytype').value;
    activity.activitydate = concatDate;
    activity.rsvpdate = this.form.get('rsvpdate').value;
    activity.descriptionsocu = this.form.get('descriptionsocu').value;
    activity.location = location;


  }
}
