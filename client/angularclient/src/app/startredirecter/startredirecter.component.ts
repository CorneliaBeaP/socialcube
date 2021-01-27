import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

/**
 * Component used for redirecting a user if it is logged in or should log in
 */
@Component({
  selector: 'app-startredirecter',
  templateUrl: './startredirecter.component.html',
  styleUrls: ['./startredirecter.component.css']
})
export class StartredirecterComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  /**
   * Setup for component
   * - Calls method checkIfLoggedInUser to check if there is a logged in user
   */
  ngOnInit(): void {
    this.checkIfLoggedInUser();
  }

  /**
   * Checks if there is a logged in user and redirects the page to /home in that case, otherwise redirects to /login
   */
  checkIfLoggedInUser() {
    if (this.authService.getUserValue()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
