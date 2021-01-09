import {Pipe, PipeTransform} from '@angular/core';
import {Activity} from "../../classes/activity";

@Pipe({
  name: 'currentmonth'
})
export class CurrentmonthPipe implements PipeTransform {

  transform(list: Activity[]): Activity[] {
    let today = new Date();
    let updatedList = [];
    list.forEach((activity) => {
      if (activity.activitydate[0] == today.getFullYear()) {
        if (activity.activitydate[1] == today.getMonth() + 1) {
          updatedList.push(activity);
        }
      }
    });
    return updatedList;
  }
}
