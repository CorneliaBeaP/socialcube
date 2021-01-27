import {Pipe, PipeTransform} from '@angular/core';
import {Activity} from "../../classes/activity";

@Pipe({
  name: 'cancelled'
})
export class CancelledPipe implements PipeTransform {

  /**
   * Pipe that removes activities that are cancelled from a list with activities
   * @param list the list that needs to be removed of cancelled activities
   */
  transform(list: Activity[]): Activity[] {
    let updatedList = [];
    list.forEach((activity) => {
      if (!activity.cancelled) {
        updatedList.push(activity);
      }
    });
    return updatedList;
  }

}
