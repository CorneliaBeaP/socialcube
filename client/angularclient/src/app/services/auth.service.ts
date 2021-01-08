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
export class AuthService {

  loginUrl: string;
  private usercredentials: string[];
  private userBehaviorSubject: BehaviorSubject<Usersocu>;
  public user: Observable<Usersocu>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.loginUrl = 'http://localhost:8080/api/login';
    this.userBehaviorSubject = new BehaviorSubject<Usersocu>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userBehaviorSubject.asObservable();
    this.authenticateAndGetUser(JSON.parse(sessionStorage.getItem('token')));
  }

  public getUserValue(): Usersocu {
    return this.userBehaviorSubject.value;
  }

  login(username: string, password: string) {
    this.usercredentials = [username, password];
    return this.http.post<Usersocu>(this.loginUrl, this.usercredentials)
      .pipe(map(data => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', JSON.stringify(data.token));
        this.userBehaviorSubject.next(data);
        return data;
      }));
  }

  authenticateAndGetUser(token: string){
    return this.http.get<Usersocu>(`http://localhost:8080/api/getuser/${token}`).subscribe(data => {
      let data2 = JSON.stringify(data);
      let data3 = JSON.parse(data2);
      console.log(data3);
      // this.userBehaviorSubject = new BehaviorSubject<Usersocu>(data3);
      // this.user = this.userBehaviorSubject.asObservable();
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userBehaviorSubject.next(null);
    this.router.navigate(['/login']);
  }

}
