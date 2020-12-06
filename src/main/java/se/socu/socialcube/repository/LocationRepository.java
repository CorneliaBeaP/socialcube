package se.socu.socialcube.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.entities.Location;

@Repository
public interface LocationRepository extends CrudRepository<Location, Long> {

}
