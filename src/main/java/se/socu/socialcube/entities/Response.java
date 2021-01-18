package se.socu.socialcube.entities;

import lombok.Getter;
import lombok.Setter;

/**
 * Class for sending responses back via rest API to the client with information after the client made an API call
 */
@Getter
@Setter
public class Response {

    /**
     * Short status describing if the action was successful or if there was errors
     */
    String status;

    /**
     * Detailed information what happened when the action was performed
     */
    String message;

    /**
     * Empty constructor for creating an empty Response setting status and message at a later time
     */
    public Response() {
    }

    /**
     * Constructor for creating a response
     * @param status short status describing if the action was successful or if there was errors
     * @param message detailed information what happened when the action was performed
     */
    public Response(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
