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


@Injectable()
export class UserService {

  usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/api/users';
  }

  public findAll(organizationnumber: number): Observable<Usersocu[]> {
    return this.http.get<Usersocu[]>(this.usersUrl + '/' + organizationnumber);
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
    return this.http.delete('http://localhost:8080/api/users/delete/' + id).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  public uploadProfilePicture(formdata: FormData, id: number) {
    this.http.post(this.usersUrl + '/add/image/' + id, formdata).subscribe(data => {
      console.log(data);
    });
  }

  public removeProfilePicture(id: number){
    this.http.get(this.usersUrl + `/delete/image/${id}`).subscribe(data=>{
      console.log(data);
    });
  }
}
