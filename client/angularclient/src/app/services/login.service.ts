import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usersocu} from "../classes/usersocu";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl: string
  private usercredentials: string[];

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/login';
  }

  authenticate(username: string, password: string): Observable<Object> {
    this.usercredentials = [username, password]
    console.log(this.usercredentials);
    console.log(this.http.post(this.loginUrl, this.usercredentials));
    return this.http.post(this.loginUrl, this.usercredentials);
  }
}
