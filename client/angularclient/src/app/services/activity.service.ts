import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    this.activityUrl = 'http://localhost:8080/home';
  }

  public save(activity: Activity) {
    //TODO: varför går inte REST-controllern igång?
    console.log('Sparar aktivitet: ' + activity.descriptionsocu);
    return this.http.post<String>(this.activityUrl, activity.descriptionsocu).pipe(map(data => {
        console.log(data);
      }
    ));
  }

  public getActivities(organizationnumber: number) {
    return this.http.get<Activity[]>(this.activityUrl + '/' + organizationnumber).pipe(map(data => {
      return data;
    }));
  }
}
