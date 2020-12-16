import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-startredirecter',
  templateUrl: './startredirecter.component.html',
  styleUrls: ['./startredirecter.component.css']
})
export class StartredirecterComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.checkIfLoggedInUser();
  }

  checkIfLoggedInUser() {
    if (this.loginService.getUserValue()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
