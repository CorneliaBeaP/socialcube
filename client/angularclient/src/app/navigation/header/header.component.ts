import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Usersocu} from "../../classes/usersocu";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  user: Usersocu;
  profilepictureurl: string;

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

  getProfilePicture(id: number) {
    this.getFolder(id).subscribe(data =>{
      this.profilepictureurl = data;
    });
  }

  getFolder(id: number): Observable<string> {
    const folderPath = `../../../../assets/ProfilePictures`;
    return this.http
      .get(`${folderPath}/${id}.png`, {observe: 'response', responseType: 'blob'})
      .pipe(
        map(response => {
          return `${folderPath}/${id}.png`;
        }),
        catchError(error => {
          // console.clear();
          return of(`${folderPath}/default.png`);
        })
      );
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }
}
