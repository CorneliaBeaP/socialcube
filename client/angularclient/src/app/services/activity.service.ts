import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Activity} from "../classes/activity";
import {map} from "rxjs/operators";
import {Usersocu} from "../classes/usersocu";


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activityUrl: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.activityUrl = 'http://localhost:8080/api/home';
  }

  // public save(activity: Activity) {
  //   const headerDict = {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Access-Control-Allow-Headers': '*',
  //   }
  //   const requestOptions = {
  //     headers: new HttpHeaders(headerDict),
  //   };
  //
  //   console.log('Skapar aktivitet');
  //   console.log(JSON.stringify(activity));
  //   let header = new HttpHeaders();
  //   header.set("Access-Control-Allow-Origin", "*");
  //
  //
  //   return this.http.post<Activity>('http://localhost:8080/api/activity/add', activity);
  // }

  public getActivities(organizationnumber: number) {
    return this.http.get<Activity[]>(this.activityUrl + '/' + organizationnumber).pipe(map(data => {
      return data;
    }));
  }

  public sendActivity(activity: Activity) {
    return this.http.post('http://localhost:8080/api/activity/add', activity).pipe(map(data => {
      let data2 = JSON.stringify(data)
      return JSON.parse(data2);
    }));
  }
}
