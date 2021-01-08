import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Usersocu} from "../../classes/usersocu";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  user: Usersocu;
  subscription: Subscription;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  logout() {
    this.authService.logout();
  }

  getAdmin() {
    if (this.user.usertype.toString() == 'ADMIN') {
      this.isAdmin = true;
    }
  }

  getLoggedInUser() {
    this.subscription = this.userService.getUser(this.authService.getToken()).subscribe((data) => {
      let data2 = JSON.stringify(data);
      this.user = JSON.parse(data2);
      this.getProfilePicture(this.user.id);
      this.getAdmin();
    });
  }

  getProfilePicture(id: number): string {
    return `../../../../assets/ProfilePictures/${id}.png`;
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }
}
