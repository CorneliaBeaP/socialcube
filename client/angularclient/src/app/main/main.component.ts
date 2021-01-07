import {Component, OnInit} from '@angular/core';
import {Usersocu} from "../classes/usersocu";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: Usersocu;


  constructor(private authService: AuthService) {
    this.user = this.authService.getUserValue();
  }

  ngOnInit(): void {
  }

}
