import {Usersocu} from "./usersocu";

export class Activity {
  id: number;
  activitytype: string;
  activitydate: Date;
  rsvpdate: Date;
  descriptionsocu: string;
  createdby: Usersocu;
  location: Location;
  attendees: Usersocu[];
}
