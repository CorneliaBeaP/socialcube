import {Component} from '@angular/core';
import {Usersocu} from "./classes/usersocu";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SocialCube';
  // currentUser: Usersocu;

  constructor(private router: Router,
              private authService: AuthService) {
    // this.authService.user.subscribe(x => this.currentUser = x);
  }

  logout(){
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
