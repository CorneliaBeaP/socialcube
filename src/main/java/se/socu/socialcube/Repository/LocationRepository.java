package se.socu.socialcube.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.Entities.Location;

@Repository
public interface LocationRepository extends CrudRepository<Location, Long> {

}
