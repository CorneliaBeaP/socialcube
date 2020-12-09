import {Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usersocu} from "../classes/usersocu";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl: string;
  private usercredentials: string[];
  private accepted: boolean;
  private currentUserSubject: BehaviorSubject<Usersocu>

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/login';

  }

  authenticate(username: string, password: string) {
    this.accepted = false;
    this.usercredentials = [username, password];
    this.http.post<boolean>(this.loginUrl, this.usercredentials).subscribe(data => {
      let newdata: Usersocu = JSON.parse(JSON.stringify(data));
      console.log(newdata.email);
      console.log(newdata.companyorganizationnumber);
    });
    return this.http.post<String>(this.loginUrl, this.usercredentials);
  }
}
