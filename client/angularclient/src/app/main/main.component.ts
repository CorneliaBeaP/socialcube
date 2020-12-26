import {Component, OnInit} from '@angular/core';
import {Usersocu} from "../classes/usersocu";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: Usersocu;


  constructor(private loginService: LoginService) {
    this.user = this.loginService.getUserValue();
  }

  ngOnInit(): void {
  }

}
