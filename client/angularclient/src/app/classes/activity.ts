import {Usersocu} from "./usersocu";
import {Location} from "./location";
import {Time} from "@angular/common";

export class Activity {
  id: number;
  activitytype: string;
  activitydate: Date;
  rsvpdate: Date;
  createddate: Date;
  descriptionsocu: string;
  createdbyid: number;
  locationname: string;
  locationaddress: string;
  attendees: Usersocu[];
  companyorganizationnumber: number;
  createdBy: Usersocu;
  cancelled: boolean;
}
