package se.socu.socialcube.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.entities.UserSocu;

import java.util.ArrayList;
import java.util.Optional;

/**
 * Repository that communicates with the database regarding things about users
 */
@Repository
public interface UserRepository extends CrudRepository<UserSocu, Long> {

    /**
     * Provides an user if there is one that has the given email address
     * @param email the users email
     * @return the user
     */
    Optional<UserSocu> findByEmail(String email);

    /**
     * Provides all users registered to a specific company
     * @param company_organizationnumber the companys id/organization number
     * @return the users registered to the company(if there are any)
     */
    Iterable<UserSocu> findAllByCompany_organizationnumber(Long company_organizationnumber);

    /**
     * Provides all the users that has attended a specific activity
     * @param activityid the id of the activity
     * @return a list containing the users that has attended the activity
     */
    @Query(value = "SELECT DISTINCT * FROM attendedactivities left JOIN usersocu where usersocu.id = usersocuid and activityid=?1", nativeQuery = true)
    ArrayList<UserSocu> findAllAttendeesByActivityId(long activityid);

    /**
     * Provides all the users that has declined a specific activity
     * @param activityid the id of the activity
     * @return a list containing the users that has declined the activity
     */
    @Query(value = "SELECT DISTINCT * FROM declinedactivities left JOIN usersocu where usersocu.id = usersocuid and activityid=?1", nativeQuery = true)
    ArrayList<UserSocu> findAllDeclinersByActivityId(long activityid);



}