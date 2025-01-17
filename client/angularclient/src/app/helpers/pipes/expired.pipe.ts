import { Pipe, PipeTransform } from '@angular/core';
import {Activity} from "../../classes/activity";

/**
 * Pipe that sorts out activities that has expired
 */
@Pipe({
  name: 'expired'
})
export class ExpiredPipe implements PipeTransform {

  /**
   * Takes an array with activities and removes the activities that has expired
   * @param list the array that needs to have expired activities removed
   * @returns an array that only contains ativities that has not expired (empty if there are none)
   */
  transform(list: Activity[]): Activity[] {
      let today = new Date();
      let itemsToRemove = [];
      list.forEach((activity) => {
        let activityDate = activity.activitydate;
        if (activityDate[0] < today.getFullYear()) {
          itemsToRemove.push(activity);
        } else if (activityDate[0] == today.getFullYear()) {
          if (activityDate[1] < (today.getMonth() + 1)) {
            itemsToRemove.push(activity);
          } else if (activityDate[1] == (today.getMonth() + 1)) {
            if (activityDate[2] < today.getDate()) {
              itemsToRemove.push(activity);
            }
          }
        }
      });
      itemsToRemove.forEach((activity) => {
        list.splice(list.indexOf(activity), 1);
      });

      return list;
    }
}
