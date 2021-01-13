package se.socu.socialcube.security.jwt;

import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import se.socu.socialcube.DTO.UserDTO;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class JwtUtilTest {
    UserDTO userDTO;

    @BeforeEach
    void setUp() {
        userDTO = new UserDTO();
        userDTO.setId(100);
        userDTO.setName("Hanna Fredriksson");
        userDTO.setEmail("hanna@company.com");
    }

    @Test
    void createJWT() {
        String token = JwtUtil.createJWT(String.valueOf(userDTO.getId()), String.valueOf(userDTO.getId()), userDTO.getName());
        assertNotNull(token);
    }

    @Test
    void decodeJWT() {
        String token = JwtUtil.createJWT(String.valueOf(userDTO.getId()), String.valueOf(userDTO.getId()), userDTO.getName());
        Claims claims = JwtUtil.decodeJWT(token);
        assertEquals(userDTO.getId(), Long.parseLong(claims.getId()));
        assertEquals("Hanna Fredriksson", claims.getSubject());
    }
}