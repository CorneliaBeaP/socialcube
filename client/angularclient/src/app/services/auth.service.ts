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

  /**
   * Gets a uservalue when an user just has logged in
   */
  public getUserValue(): Usersocu {
    return this.userBehaviorSubject.value;
  }

  /**
   * Gets the saved JSON Web Token for the logged in user from LocalStorage
   */
  public getToken() {
    let token = '';
    if (localStorage.getItem('token')) {
      token = JSON.parse(localStorage.getItem('token'));
    }
    return token;
  }

  /**
   * Forwards user credentials to the backend to check if they are correct or not and which usertype the user has
   * @param username the username the user has provided in the login-form
   * @param password the password the user has provided in the login-form
   */
  login(username: string, password: string) {
    this.usercredentials = [username, password];
    return this.http.post<Usersocu>(this.loginUrl, this.usercredentials)
      .pipe(map(data => {
        if(data.usertype.toString() === 'ADMIN'){
          data.usertype = 900;
        }else{
          data.usertype = 300;
        }
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', JSON.stringify(data.token));
        this.userBehaviorSubject.next(data);
        return data;
      }));
  }

  /**
   * Logs out the user by navigating to /login and remove all items from LocalStorage
   */
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userBehaviorSubject.next(null);
    this.router.navigate(['/login']);
  }
}
