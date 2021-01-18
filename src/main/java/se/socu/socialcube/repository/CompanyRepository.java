package se.socu.socialcube.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.entities.Company;

import java.util.Optional;

/**
 * Repository that communicates with the database regarding things about the entity Company
 */
@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {

    /**
     * Provides a specific Company
     * @param id the organization number of the company
     * @return the company (if there is one with that organization number)
     */
    @Override
    Optional<Company> findById(Long id);
}