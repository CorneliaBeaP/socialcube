import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usersocu} from "../classes/usersocu";
import {BehaviorSubject, Observable} from "rxjs";
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

  }

  public getUserValue(): Usersocu {
    return this.userBehaviorSubject.value;
  }

  public getToken(){
    return JSON.parse(localStorage.getItem('token'));
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

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userBehaviorSubject.next(null);
    this.router.navigate(['/login']);
  }
}
