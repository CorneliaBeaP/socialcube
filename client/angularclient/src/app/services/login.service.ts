import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usersocu} from "../classes/usersocu";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl: string
  private usercredentials: string[];

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/login';
  }

  authenticate(username: string, password: string) {
    this.usercredentials = [username, password]
    return this.http.post(this.loginUrl, this.usercredentials);
  }
}
