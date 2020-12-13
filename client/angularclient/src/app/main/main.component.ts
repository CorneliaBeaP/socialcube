import {Component, OnInit} from '@angular/core';
import {Usersocu} from "../classes/usersocu";
import {LoginService} from "../services/login.service";
import {ActivityService} from "../services/activity.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: Usersocu;


  constructor(private loginService: LoginService,
              private activityService: ActivityService) {
    this.user = this.loginService.getUserValue();
  }

  ngOnInit(): void {
    this.getAllActivities();
  }

  getAllActivities() {
    this.activityService.getActivities(this.user.companyorganizationnumber).subscribe({
      next(data) {
        // let data2 = JSON.stringify(data)
        // console.log('Data: ' + JSON.parse(data2));
        console.log(data);
      }
    });
  }
}
