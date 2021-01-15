package se.socu.socialcube.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.entities.Activity;
import se.socu.socialcube.entities.UserSocu;

import java.util.ArrayList;

@Repository
public interface ActivityRepository extends CrudRepository<Activity, Long> {

    ArrayList<Activity> findAllByCompany_organizationnumber(long company_organizationnumber);

    @Query(value = "SELECT DISTINCT * FROM attendedactivities left JOIN activity where activity.id = activityid and usersocuid=?1", nativeQuery = true)
    ArrayList<Activity> findAllAttendedActivitiesByUsersocuId(long userid);

    @Query(value = "SELECT DISTINCT * FROM declinedactivities left JOIN activity where activity.id = activityid and usersocuid=?1", nativeQuery = true)
    ArrayList<Activity> findAllDeclinedActivitiesByUsersocuId(long userid);

    ArrayList<Activity> findAllByCreatedby(UserSocu userSocu);
}