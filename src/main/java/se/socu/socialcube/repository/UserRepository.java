package se.socu.socialcube.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.UserSocu;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserSocu, Long> {
     Optional<UserSocu> findById(long id);
     Optional<UserSocu> findByEmail(String email);
}