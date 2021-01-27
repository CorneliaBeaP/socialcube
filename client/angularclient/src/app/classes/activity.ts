import {Usersocu} from "./usersocu";

/**
 * The class used for receiving and sending activities from and to the backend
 */
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
