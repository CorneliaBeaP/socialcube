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

  logout() {
    this.authService.logout();
  }

  getAdmin() {
    if (this.user.usertype.toString() == 'ADMIN') {
      this.isAdmin = true;
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  getProfilePicture(id: number) {
    this.profilepictureurl = `../../../../assets/ProfilePictures/${id}.png`;
  }


  errorHandler(event) {
    event.target.src = `../../../../assets/ProfilePictures/default.png`;
  }
}
