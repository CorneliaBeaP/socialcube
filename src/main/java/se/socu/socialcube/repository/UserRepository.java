package se.socu.socialcube.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.UserSocu;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserSocu, Long> {

    Optional<UserSocu> findByEmail(String email);

    Iterable<UserSocu> findAllByCompany_organizationnumber(Long company_organizationnumber);

    @Query(value = "SELECT DISTINCT * FROM attendedactivities left JOIN usersocu where usersocu.id = usersocuid and activityid=?1", nativeQuery = true)
    ArrayList<UserSocu> findAllAttendeesByActivityId(long activityid);

    @Query(value = "SELECT DISTINCT * FROM declinedactivities left JOIN usersocu where usersocu.id = usersocuid and activityid=?1", nativeQuery = true)
    ArrayList<UserSocu> findAllDeclinersByActivityId(long activityid);



}