import {Component, OnDestroy, OnInit} from '@angular/core';
import {Usersocu} from "../classes/usersocu";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  user: Usersocu;
  subscription: Subscription;


  constructor(private authService: AuthService,
              private userService: UserService) {
    this.getLoggedInUser();
  }

  ngOnInit(): void {
  }

  getLoggedInUser(){
    this.subscription = this.userService.getUser(this.authService.getToken()).subscribe((data) => {
      let data2 = JSON.stringify(data);
      this.user = JSON.parse(data2);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
