import {Usersocu} from "./usersocu";
import {Location} from "./location";

export class Activity {
  id: number;
  activitytype: string;
  activitydate: Date;
  rsvpdate: Date;
  descriptionsocu: string;
  createdby: Usersocu;
  location: Location;
  attendees: Usersocu[];
  companyorganizationnumber: number;
}
