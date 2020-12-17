import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {UserService} from "../../services/user.service";
import {LoginService} from "../../services/login.service";
import {Usersocu} from "../../classes/usersocu";
import {Activity} from "../../classes/activity";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-current-activities',
  templateUrl: './current-activities.component.html',
  styleUrls: ['./current-activities.component.css']
})
export class CurrentActivitiesComponent implements OnInit, OnDestroy {

  showCurrentActivities = true;
  showCard = false;
  currentActivities: Activity[];
  user: Usersocu;
  subscription: Subscription;

  constructor(private activityService: ActivityService,
              private userService: UserService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.user = this.loginService.getUserValue();
    this.getActivities();

  }

  getActivities() {
    this.subscription = this.activityService.getActivities(this.user.companyorganizationnumber).subscribe(next => {
      this.currentActivities = next;
    });
  }

  showcard(event) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
