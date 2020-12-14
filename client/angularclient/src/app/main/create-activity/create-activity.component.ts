import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Usersocu} from "../../classes/usersocu";
import {Activity} from "../../classes/activity";
import {Location} from "../../classes/location";
import {Time} from "@angular/common";
import {min} from "rxjs/operators";
import {ActivityService} from "../../services/activity.service";
import {LoginService} from "../../services/login.service";
import {Timestamp} from "rxjs/internal-compatibility";


@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  showPlanActivity = false;
  showCurrentActivities = false;

  form: FormGroup;


  // location: Location;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private activityService: ActivityService,
              private loginService: LoginService) {
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
    if (this.form.invalid) {
      return;
    }

    // let location = new Location();
    // location.name = this.form.get('locationname').value;
    // location.address = this.form.get('locationaddress').value;
    //
    // let date = new Date(this.form.get('activitydate').value);
    // let time = this.form.get('activitytime').value;
    // let hours = time.toString().substring(0, 2);
    // let minutes = time.toString().substring(3, 5);
    // let concatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
    // let activity = new Activity();
    // activity.activitytype = this.form.get('activitytype').value;
    // activity.activitydate = concatDate;
    // activity.rsvpdate = this.form.get('rsvpdate').value;
    // activity.descriptionsocu = this.form.get('descriptionsocu').value;
    // activity.locationname = this.form.get('locationname').value;
    // activity.locationaddress = this.form.get('locationaddress').value;
    // activity.createdbyid = this.loginService.getUserValue().id;
    // activity.companyorganizationnumber = this.loginService.getUserValue().companyorganizationnumber;
    // // this.createActivity(activity);
  }

  // createActivity(activity: Activity) {
  //   this.activityService.save(activity);
  // }

  sendActivity(){
    console.log('Skickar');
    let activity = new Activity();

    let date = new Date(this.form.get('activitydate').value);
    let time = this.form.get('activitytime').value;
    let hours = time.toString().substring(0, 2);
    let minutes = time.toString().substring(3, 5);
    let concatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);

    activity.descriptionsocu = this.form.get('descriptionsocu').value;
    activity.activitytype = this.form.get('activitytype').value;
    activity.locationname = this.form.get('locationname').value;
    activity.locationaddress =this.form.get('locationaddress').value;
    activity.createdbyid = this.loginService.getUserValue().id;
    activity.companyorganizationnumber = this.loginService.getUserValue().companyorganizationnumber;
    activity.activitydate = concatDate;
    activity.rsvpdate = this.form.get('rsvpdate').value;
    console.log(activity);

    this.activityService.sendActivity(activity).subscribe(next=>{
      console.log(next);
    });
  }

}
