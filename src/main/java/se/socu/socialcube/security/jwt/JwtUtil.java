package se.socu.socialcube.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.security.Key;
import java.util.Date;

/**
 * Is used to create and decode Jason Web Tokens
 * source: https://developer.okta.com/blog/2018/10/31/jwts-with-java
 */
public class JwtUtil {

    /**
     * Secret key to use in last part of JWT
     */
    private static String SECRET_KEY;

    public JwtUtil() throws IOException {
        ReadPropertyFile readPropertyFile = new ReadPropertyFile();
        SECRET_KEY = readPropertyFile.getSecretKey();
    }


    /**
     * Creates a Jason Web Token for a specific user
     * @param id the id of the user
     * @param issuer the name of the user
     * @param subject the name of the user
     * @return the Jason Web Token in a String-format
     */
    public static String createJWT(String id, String issuer, String subject) {

        //The JWT signature algorithm we will be using to sign the token
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //We will sign our JWT with our ApiKey secret
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //Let's set the JWT Claims
        JwtBuilder builder = Jwts.builder().setId(id)
                .setIssuedAt(now)
                .setSubject(subject)
                .setIssuer(issuer)
                .setExpiration(new Date(System.currentTimeMillis() + 864000000))
                .signWith(signatureAlgorithm, signingKey);

        //Builds the JWT and serializes it to a compact, URL-safe string
        return builder.compact();
    }

    /**
     * Decodes a provided Jason Web Token and retrieves information about the user
     * @param jwt the Jason Web Token
     * @return claims-object with embedded information about the id and name of the user
     */
    public static Claims decodeJWT(String jwt) {

        //This line will throw an exception if it is not a signed JWS (as expected)
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .parseClaimsJws(jwt).getBody();
    }
}
