package se.socu.socialcube.security.jwt;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class ReadPropertyFileTest {

    @Test
    void getSecretKey() throws IOException {
        ReadPropertyFile readPropertyFile = new ReadPropertyFile();
       String secretkey = readPropertyFile.getSecretKey();
       assertNotNull(secretkey);
       assertEquals(31, secretkey.length());
    }
}