import {Usersocu} from "./usersocu";
import {Location} from "./location";

export class Activity {
  id: number;
  activitytype: string;
  activitydate: Date;
  rsvpdate: Date;
  descriptionsocu: string;
  createdby: Usersocu;
  locationname: String;
  locationaddress: String;
  attendees: Usersocu[];
  companyorganizationnumber: number;
}
