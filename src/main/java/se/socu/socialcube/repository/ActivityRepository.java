package se.socu.socialcube.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.entities.Activity;
import se.socu.socialcube.entities.UserSocu;

import java.util.ArrayList;

/**
 * Repository that communicates with the database regarding things about the entity Activity
 */
@Repository
public interface ActivityRepository extends CrudRepository<Activity, Long> {

    /**
     * Provides all activities registered to a specific company.
     * @param company_organizationnumber the organization number of the company
     * @return the list with activities registered to the company
     */
    ArrayList<Activity> findAllByCompany_organizationnumber(long company_organizationnumber);

    /**
     * Provides all the activities that a specific user has attended.
     * @param userid the id of the user
     * @return a list containing the activities the user has attended
     */
    @Query(value = "SELECT DISTINCT * FROM attendedactivities left JOIN activity where activity.id = activityid and usersocuid=?1", nativeQuery = true)
    ArrayList<Activity> findAllAttendedActivitiesByUsersocuId(long userid);

    /**
     * Provides all the activities that a specific user has declined.
     * @param userid the id of the user
     * @return a list containing the activities the user has declined
     */
    @Query(value = "SELECT DISTINCT * FROM declinedactivities left JOIN activity where activity.id = activityid and usersocuid=?1", nativeQuery = true)
    ArrayList<Activity> findAllDeclinedActivitiesByUsersocuId(long userid);

    /**
     * Provides all the activities a specific user has created.
     * @param userSocu the id of the user
     * @return a list containing the activities the user has created
     */
    ArrayList<Activity> findAllByCreatedby(UserSocu userSocu);
}