package se.socu.socialcube.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.UserSocu;

@Repository
public interface UserRepository extends CrudRepository<UserSocu, Long> {
     UserSocu findById(long id);
     UserSocu findByEmail(String email);
}