import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Activity} from "../classes/activity";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activityUrl: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.activityUrl = 'http://localhost:8080/api/home';
  }

  public getActivities(token: string) {
    return this.http.get<Activity[]>(this.activityUrl + '/' + token).pipe(map(data => {
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

  public cancelActivity(id: number) {
    return this.http.get(`http://localhost:8080/api/activity/cancel/${id}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  public attendActivity(token: string, activityid: number) {
    return this.http.get(`http://localhost:8080/api/activity/attendactivity/${token}/${activityid}`).subscribe(data => {
      console.log(data);
    });
  }

  public getattendedActivities(token: string) {
    return this.http.get(`http://localhost:8080/api/activity/attendedactivities/${token}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  public getDeclinedActivities(token: string) {
    return this.http.get(`http://localhost:8080/api/activity/declinedactivities/${token}`).pipe(map(data => {
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

  public attendDeclinedActivity(token: string, activityid: number) {
    return this.http.get(`http://localhost:8080/api/activity/attenddeclined/${token}/${activityid}`).subscribe(data => {
      console.log(data);
    });
  }

  public declineActivity(userid: number, activityid: number) {
    return this.http.get(`http://localhost:8080/api/activity/decline/${activityid}/${userid}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  public deleteActivity(activityid: number){
    return this.http.get(`http://localhost:8080/api/activity/delete/${activityid}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }
}
