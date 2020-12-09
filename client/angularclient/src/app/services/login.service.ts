import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usersocu} from "../classes/usersocu";
import {Observable, of, Subscription} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl: string
  private usercredentials: string[];
  accepted = false;

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/login';
  }

  //TODO: fortsätt här, varför får jag fortfarande CORS-felmeddelande?
  authenticate(username: string, password: string): Observable<boolean> {
    this.usercredentials = [username, password]
    // return of(this.http.post<boolean>(this.loginUrl, this.usercredentials).subscribe(boolean => this.accepted = boolean));
    return this.http.post<boolean>(this.loginUrl, this.usercredentials);
  }
}
