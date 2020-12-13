package se.socu.socialcube.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.entities.Activity;

import java.util.ArrayList;

@Repository
public interface ActivityRepository extends CrudRepository<Activity, Long> {

    ArrayList<Activity> findAllByCompany_organizationnumber(long company_organizationnumber);
}