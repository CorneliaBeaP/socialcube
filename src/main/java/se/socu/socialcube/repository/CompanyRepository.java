package se.socu.socialcube.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.entities.Company;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {

}