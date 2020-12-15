package se.socu.socialcube.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Response {

    String status;
    String message;

    public Response() {
    }

    public Response(String status, String message) {
        this.status = status;
        this.message = message;
    }
}