import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;

  constructor(private loginService: LoginService) {
    this.getAdmin();
  }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
  }

  getAdmin() {
    let user = this.loginService.getUserValue();
    if (user.usertype.toString() == 'ADMIN') {
      this.isAdmin = true;
    }
  }

  goToProfile(){

  }
}
