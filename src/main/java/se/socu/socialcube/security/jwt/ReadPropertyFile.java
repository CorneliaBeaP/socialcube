package se.socu.socialcube.security.jwt;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;


/**
 * Helpclass to read from config.properties
 */
public class ReadPropertyFile {

    /**
     * Retrieves the secret key used to create a JWT in JwtUtil from config.properties
     * @return the secret key
     * @throws IOException
     */
    public String getSecretKey() throws IOException {
        Properties properties = new Properties();
        FileInputStream fileInputStream = new FileInputStream("src/main/resources/config.properties");
        properties.load(fileInputStream);
        return properties.getProperty("SECRET_KEY");
    }
}
