package se.socu.socialcube.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.Entities.UserSocu;

@Repository
public interface UserRepository extends CrudRepository<UserSocu, Long> {

}