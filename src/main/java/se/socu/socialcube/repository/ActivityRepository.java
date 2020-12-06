package se.socu.socialcube.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.entities.Activity;

@Repository
public interface ActivityRepository extends CrudRepository<Activity, Long> {

}