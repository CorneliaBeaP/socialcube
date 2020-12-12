// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//
//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usersocu } from '../classes/usersocu';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(): Observable<Usersocu[]> {
    return this.http.get<Usersocu[]>(this.usersUrl);
  }
  //
  // public save(user: Usersocu) {
  //   return this.http.post<Usersocu>(this.usersUrl, user);
  // }
}
