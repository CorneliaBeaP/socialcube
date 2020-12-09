import {Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usersocu} from "../classes/usersocu";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {LoginComponent} from "../login/login.component";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl: string;
  private usercredentials: string[];
  private accepted: boolean;
  private currentUserSubject: BehaviorSubject<Usersocu>
  private currentUser: Usersocu;

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/login';

  }

  authenticate(username: string, password: string) {
    let accepted = false;
    this.usercredentials = [username, password];
    this.http.post<Usersocu>(this.loginUrl, this.usercredentials).subscribe(data => {
      let loggedinuser: Usersocu = JSON.parse(JSON.stringify(data));
      if (!((loggedinuser.email) == null)) {
        sessionStorage.setItem('id', JSON.stringify(loggedinuser.id));
        this.currentUser = new Usersocu();
        this.currentUser.id = loggedinuser.id;
        this.currentUser.email = loggedinuser.email;
      }
    });
  }
}
