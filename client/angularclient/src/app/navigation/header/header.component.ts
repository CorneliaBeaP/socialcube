import {Component, Input, OnInit} from '@angular/core';
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
  @Input('user') user: Usersocu;
  subscription: Subscription;
  profilepictureurl = '../../../../assets/ProfilePictures/default.png';

  constructor(private http: HttpClient,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    if(this.user){
      if(this.user.id){
        this.getProfilePicture(this.user.id);
      }
      this.getAdmin();
    }
  }

  /**
   * Logs out the user
   */
  logout() {
    this.authService.logout();
  }

  /**
   * Checks if the logged in user is an admin
   */
  getAdmin() {
    if (this.user.usertype.toString() == 'ADMIN') {
      this.isAdmin = true;
    }
  }

  /**
   * Navigates to /profile
   */
  goToProfile() {
    this.router.navigate(['/profile']);
  }

  /**
   * Gets the url for the profile picture for a user
   * @param id the id of the user
   */
  getProfilePicture(id: number) {
    this.profilepictureurl = `../../../../assets/ProfilePictures/${id}.png`;
  }

  /**
   * Shows a default profile picture if an url is not found for the profile picture
   * @param event the source event
   */
  errorHandler(event) {
    event.target.src = `../../../../assets/ProfilePictures/default.png`;
  }
}
