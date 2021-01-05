import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Activity} from "../classes/activity";
import {map} from "rxjs/operators";
import {Usersocu} from "../classes/usersocu";
import {Response} from "../classes/response";


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activityUrl: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.activityUrl = 'http://localhost:8080/api/home';
  }

  public getActivities(organizationnumber: number) {
    return this.http.get<Activity[]>(this.activityUrl + '/' + organizationnumber).pipe(map(data => {
      return data;
    }));
  }

  public createActivity(activity: Activity) {
    return this.http.post('http://localhost:8080/api/activity/add', activity).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  public updateActivity(activity: Activity) {
    return this.http.post('http://localhost:8080/api/activity/update', activity).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  public cancelActivity(id: number){
    return this.http.get(`http://localhost:8080/api/activity/cancel${id}`).subscribe(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    });
  }

  public attendActivity(userid: number, activityid: number) {
    let info = [userid, activityid];
    return this.http.post('http://localhost:8080/api/activity/attendactivity', info).subscribe(data => {
      console.log(data);
    });
  }

  public getattendedActivities(userid: number) {
    return this.http.get(`http://localhost:8080/api/activity/attendedactivities/` + userid).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  public getAttendees(activityid: number) {
    return this.http.get(`http://localhost:8080/api/activity/attendees/${activityid}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  public declineAttendedActivity(userid: number, activityid: number) {
    return this.http.delete(`http://localhost:8080/api/activity/decline/${activityid}/${userid}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }
}
