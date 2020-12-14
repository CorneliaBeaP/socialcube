import {Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usersocu} from "../classes/usersocu";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl: string;
  private usercredentials: string[];
  private userBehaviorSubject: BehaviorSubject<Usersocu>;
  public user: Observable<Usersocu>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.loginUrl = 'http://localhost:8080/api/login';
    this.userBehaviorSubject = new BehaviorSubject<Usersocu>(JSON.parse(sessionStorage.getItem('user')));
    this.user = this.userBehaviorSubject.asObservable();
  }

  public getUserValue(): Usersocu {
    return this.userBehaviorSubject.value;
  }

  authenticate(username: string, password: string) {
    this.usercredentials = [username, password];
    return this.http.post<Usersocu>(this.loginUrl, this.usercredentials)
      .pipe(map(data => {
        sessionStorage.setItem('user', JSON.stringify(data));
        this.userBehaviorSubject.next(data);
        return data;
      }));
  }

  logout() {
    sessionStorage.removeItem('user');
    this.userBehaviorSubject.next(null);
    this.router.navigate(['/login']);
  }

}
