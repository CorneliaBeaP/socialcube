import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Activity} from "../classes/activity";
import {map} from "rxjs/operators";


/**
 * Service used to communicate with the backend regarding activities
 */
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  /**
   * The url used for sending REST request about activities
   */
  activityUrl: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.activityUrl = 'http://localhost:8080/api/home';
  }

  /**
   * Sends a request to the backend to get all the activities registered to the company the logged in user works at by providing a JWT
   * @param token the users saved JWT from LocalStorage
   */
  public getActivities(token: string) {
    return this.http.get<Activity[]>(this.activityUrl + '/' + token).pipe(map(data => {
      return data;
    }));
  }

  /**
   * Sends information to the backend about that a new activity has been created
   * @param activity the new activity
   */
  public createActivity(activity: Activity) {
    return this.http.post('http://localhost:8080/api/activity/add', activity).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  /**
   * Sends a request to the backend to update an activity with new information
   * @param activity the activity including the new information
   */
  public updateActivity(activity: Activity) {
    return this.http.post('http://localhost:8080/api/activity/update', activity).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  /**
   * Sends a request to the backend to change an activity to cancelled in the database
   * @param id the id of the activity
   */
  public cancelActivity(id: number) {
    return this.http.get(`http://localhost:8080/api/activity/cancel/${id}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  /**
   * Sends information to the backend that a user wants to attend an activity
   * @param token the saved JWT of the user from LocalStorage
   * @param activityid the id of the activity
   */
  public attendActivity(token: string, activityid: number) {
    return this.http.get(`http://localhost:8080/api/activity/attendactivity/${token}/${activityid}`).subscribe(data => {
      console.log(data);
    });
  }

  /**
   * Sends a request to the backend to get all the activities the logged in user has attended by providing a JWT
   * @param token the saved JWT of the user from LocalStorage
   */
  public getattendedActivities(token: string) {
    return this.http.get(`http://localhost:8080/api/activity/attendedactivities/${token}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  /**
   * Sends a request to the backend to get all the activities the logged in user has declined by providing a JWT
   * @param token the saved JWT of the user from LocalStorage
   */
  public getDeclinedActivities(token: string) {
    return this.http.get(`http://localhost:8080/api/activity/declinedactivities/${token}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  /**
   * Sends a request to the backend to get all the users that has attended a specific activity
   * @param activityid the id of the activity
   */
  public getAttendees(activityid: number) {
    return this.http.get(`http://localhost:8080/api/activity/attendees/${activityid}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  /**
   * Sends information to the backend that a user wants to decline an activity he or she previously has attended
   * @param token the saved JWT of the user from LocalStorage
   * @param activityid the id of the activity
   */
  public declineAttendedActivity(token: string, activityid: number) {
    return this.http.delete(`http://localhost:8080/api/activity/decline/${activityid}/${token}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  /**
   * Sends information to the backend that a user wants to attend an activity he or she previously has declined
   * @param token the saved JWT of the user from LocalStorage
   * @param activityid the id of the activity
   */
  public attendDeclinedActivity(token: string, activityid: number) {
    return this.http.get(`http://localhost:8080/api/activity/attenddeclined/${token}/${activityid}`).subscribe(data => {
      console.log(data);
    });
  }

  /**
   * Sends information to the backend that a user wants to decline an activity
   * @param token the saved JWT of the user from LocalStorage
   * @param activityid the id of the activity
   */
  public declineActivity(token: string, activityid: number) {
    return this.http.get(`http://localhost:8080/api/activity/decline/${activityid}/${token}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  /**
   * Sends information to the backend that an activity should be deleted
   * @param activityid the id of the activity
   */
  public deleteActivity(activityid: number){
    return this.http.get(`http://localhost:8080/api/activity/delete/${activityid}`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }
}
