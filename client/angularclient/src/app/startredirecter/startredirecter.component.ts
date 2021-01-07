import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-startredirecter',
  templateUrl: './startredirecter.component.html',
  styleUrls: ['./startredirecter.component.css']
})
export class StartredirecterComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.checkIfLoggedInUser();
  }

  checkIfLoggedInUser() {
    if (this.authService.getUserValue()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
