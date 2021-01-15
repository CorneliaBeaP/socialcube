import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit, OnDestroy {
  queryparam: string;
  subscription: Subscription;
  errormessage = 'Ojdå! Något gick fel.';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.queryparam = params['returnUrl'];
    });
    this.getErrorMessage();
  }

  getErrorMessage() {
    if (this.queryparam == '/admin') {
      this.errormessage = 'Du har inte behörighet att komma åt denna sida.';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
