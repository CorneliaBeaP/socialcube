import {Pipe, PipeTransform} from '@angular/core';
import {Activity} from "../../classes/activity";

@Pipe({
  name: 'cancelled'
})
export class CancelledPipe implements PipeTransform {

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
