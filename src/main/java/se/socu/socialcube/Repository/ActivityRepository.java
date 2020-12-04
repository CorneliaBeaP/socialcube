package se.socu.socialcube.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.Entities.Activity;

@Repository
public interface ActivityRepository extends CrudRepository<Activity, Long> {

}