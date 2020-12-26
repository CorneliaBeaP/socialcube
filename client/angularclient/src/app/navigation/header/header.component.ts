import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Usersocu} from "../../classes/usersocu";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  user: Usersocu;

  constructor(private http: HttpClient,
              private loginService: LoginService,
              private router: Router) {
    this.getAdmin();
  }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.getProfilePicture(this.user.id);
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

  getLoggedInUser() {
    this.user = this.loginService.getUserValue();
  }

  getProfilePicture(id: number): string {
    return `../../../../assets/ProfilePictures/${id}.png`;
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }
}
