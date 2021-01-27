/**
 * The class used for receiving and sending users from and to the backend
 */
export class Usersocu {
  /**
   * UserID
   */
  id: number;
  /**
   * ADMIN or USER
   */
  usertype: number;
  /**
   * First and last name
   */
  name: string;
  /**
   * Email used as username
   */
  email: string;
  /**
   * Employment number for the user if there is any, not obligatory
   */
  employmentnumber?: string;
  /**
   * Department user works at, not obligatory
   */
  department?: string;
  /**
   * The company organization number the user is registered to and works at
   */
  companyorganizationnumber: number;
  /**
   * Name of the company that the user is registered to and works at
   */
  companyname: string;
  /**
   * JSON Web Token generated in the backend when user logs in
   */
  token?: string;
}
