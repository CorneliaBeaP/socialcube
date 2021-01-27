import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usersocu} from '../classes/usersocu';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {Response} from "../classes/response";


@Injectable()
export class UserService {

  usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/api/users';
  }

  /**
   * Sends a request to the backend to get all the users for a specific company
   * @param organizationnumber the organization number of the company
   */
  public findAll(organizationnumber: number): Observable<Usersocu[]> {
    return this.http.get<Usersocu[]>(this.usersUrl + '/' + organizationnumber);
  }

  /**
   * Sends information to the backend about a new user that should be saved in the database
   * @param usersocu the new user that should be saved
   */
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
    let user2 = JSON.stringify(usersocu);

    return this.http.post('http://localhost:8080/api/users/add', user2, requestOptions).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  /**
   * Sends a request to the backend to delete an user
   * @param id the id of the user
   */
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

  /**
   * Sends a request to the backend to delete a profile picture for a specific user
   * @param id the id of the user
   */
  public removeProfilePicture(id: number) {
    this.http.get(this.usersUrl + `/delete/image/${id}`).subscribe(data => {
      console.log(data);
    });
  }

  /**
   * Sends a request to the backend to change a users password
   * @param oldPassword the password the user has provided as its old password
   * @param newPassword the new password that the user want to use from now on
   * @param token the saved JWT of the user from LocalStorage
   */
  public changePassword(oldPassword: string, newPassword: string, token: string) {
    let passw = [oldPassword, newPassword];
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.put(`http://localhost:8080/api/users/password/${token}`, passw, requestOptions).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  /**
   * Sends a request to the backend to update a users name, email and/or department
   * @param token the saved JWT of the user from LocalStorage
   * @param name the name of the user
   * @param email the email of the user
   * @param department the department of the user
   */
  public updateUserInformation(token: string, name: string, email: string, department: string) {
    let information = [name, email, department];
    return this.http.put(`http://localhost:8080/api/users/update/${token}`, information).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  /**
   * Sends a request to the backend to get a specific user by providing the users JSON Web Token
   * @param token the saved JWT of the user from LocalStorage
   */
  public getUser(token: string) {
    return this.http.get(`http://localhost:8080/api/user/${token}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }
}
