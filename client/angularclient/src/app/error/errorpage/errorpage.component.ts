import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

/**
 * Component used when navigating to /error
 */
@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit, OnDestroy {
  /**
   * Holds information about where the user wanted to navigate, e.g "/admin"
   */
  queryparam: string;
  subscription: Subscription;
  /**
   * The standard error message that can be modified depending on where the user wanted to navigate
   */
  errormessage = 'Ojdå! Något gick fel.';

  constructor(private route: ActivatedRoute) {
  }

  /**
   * Checks where the user come from and generates the error messages
   */
  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.queryparam = params['returnUrl'];
    });
    this.getErrorMessage();
  }

  /**
   * Changes the error message on the page if the user tries accessing /admin and does not have that authority
   */
  getErrorMessage() {
    if (this.queryparam == '/admin') {
      this.errormessage = 'Du har inte behörighet att komma åt denna sida.';
    }
  }

  /**
   * Unsubscribes from any subscriptions to prevent memory leak
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
