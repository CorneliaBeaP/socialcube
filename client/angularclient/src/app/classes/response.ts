/**
 * The class used for receiving responses from the backend
 */
export class Response {
  /**
   * Status can be either ERROR or OK depending on what has happened in the backend
   */
  status?: string;
  /**
   * Message contains more information about what has happened in the backend leading to the given status
   */
  message?: string;
}
