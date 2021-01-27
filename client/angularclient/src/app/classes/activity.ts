import {Usersocu} from "./usersocu";

/**
 * The class used for receiving and sending activities from and to the backend
 */
export class Activity {
  /**
   * The id of the activity saved in the database
   */
  id: number;
  /**
   * Type of the activity
   */
  activitytype: string;
  /**
   * The date the activity takes place
   */
  activitydate: Date;
  /**
   * The date the other users latest can attend an activity
   */
  rsvpdate: Date;
  /**
   * The date the activity is created
   */
  createddate: Date;
  /**
   * Description for the activity
   */
  descriptionsocu: string;
  /**
   * The id of the user that has created the activity
   */
  createdbyid: number;
  /**
   * The name of the location of which the activity takes place, e.g "The Best Bar"
   */
  locationname: string;
  /**
   * The address of the location of which the activity takes place, e.g "Stockholm street 1, 11427 Stockholm"
   */
  locationaddress: string;
  /**
   * A list of the users that has attended the activity, empty if none
   */
  attendees: Usersocu[];
  /**
   * The company organization number of which the activity is registered to
   */
  companyorganizationnumber: number;
  /**
   * The user that created the activity
   */
  createdBy: Usersocu;
  /**
   * Boolean if the activity is cancelled or not (true if cancelled)
   */
  cancelled: boolean;
}
