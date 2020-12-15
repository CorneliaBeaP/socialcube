// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//
//   constructor() { }
// }

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Usersocu} from '../classes/usersocu';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {Activity} from "../classes/activity";

@Injectable()
export class UserService {

  usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/api/users';
  }

  public findAll(organizationnumber: number): Observable<Usersocu[]> {
    return this.http.get<Usersocu[]>(this.usersUrl + '/' + organizationnumber);
  }

  public sendUser2(string: string) {
    const headerDict = {
      'Content-Type': 'text/plain',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    // console.log(JSON.stringify(user));
    return this.http.post('http://localhost:8080/api/users/add', string, requestOptions).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  public sendUser(usersocu: Usersocu) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    console.log('SendUser()');
    let user2 = JSON.stringify(usersocu);
    return this.http.post('http://localhost:8080/api/users/add', user2, requestOptions).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  public deleteUser(id: number) {
    console.log('Trying to delete');
    return this.http.delete('http://localhost:8080/api/users/delete/' + id).pipe(map(data => {
    let data2 = JSON.stringify(data);
    return JSON.parse(data2);
    }));
  }
}
