package se.socu.socialcube.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.Entities.Company;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {

}