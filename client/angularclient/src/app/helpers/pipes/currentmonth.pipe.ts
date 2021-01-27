import {Pipe, PipeTransform} from '@angular/core';
import {Activity} from "../../classes/activity";

/**
 * Pipe that sorts out activities that takes place the current month
 */
@Pipe({
  name: 'currentmonth'
})
export class CurrentmonthPipe implements PipeTransform {

  /**
   * Finds activities that takes place the same month that it currently is and returns an array with only these activities
   * @param list the list that needs to be sorted
   * @returns an array only containing activities taking place this month (empty array if there is none)
   */
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
