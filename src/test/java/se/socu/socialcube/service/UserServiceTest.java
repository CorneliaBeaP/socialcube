package se.socu.socialcube.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import se.socu.socialcube.entities.Company;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.repository.CompanyRepository;
import se.socu.socialcube.repository.UserRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

   private UserRepository userRepository = new UserRepository() {


       @Override
       public Optional<UserSocu> findByEmail(String email) {
           return Optional.empty();
       }

       @Override
       public Iterable<UserSocu> findAllByCompany_organizationnumber(Long company_organizationnumber) {
           return null;
       }

       @Override
       public ArrayList<UserSocu> findAllAttendeesByActivityId(long activityid) {
           return null;
       }

       @Override
       public ArrayList<UserSocu> findAllDeclinersByActivityId(long activityid) {
           return null;
       }

       @Override
       public <S extends UserSocu> S save(S s) {
           return null;
       }

       @Override
       public <S extends UserSocu> Iterable<S> saveAll(Iterable<S> iterable) {
           return null;
       }

       @Override
       public Optional<UserSocu> findById(Long aLong) {
           return Optional.empty();
       }

       @Override
       public boolean existsById(Long aLong) {
           return false;
       }

       @Override
       public Iterable<UserSocu> findAll() {
           return null;
       }

       @Override
       public Iterable<UserSocu> findAllById(Iterable<Long> iterable) {
           return null;
       }

       @Override
       public long count() {
           return 0;
       }

       @Override
       public void deleteById(Long aLong) {

       }

       @Override
       public void delete(UserSocu userSocu) {

       }

       @Override
       public void deleteAll(Iterable<? extends UserSocu> iterable) {

       }

       @Override
       public void deleteAll() {

       }
   };
   private CompanyRepository companyRepository = new CompanyRepository() {
       @Override
       public Optional<Company> findById(Long aLong) {
           return Optional.empty();
       }

       @Override
       public <S extends Company> S save(S s) {
           return null;
       }

       @Override
       public <S extends Company> Iterable<S> saveAll(Iterable<S> iterable) {
           return null;
       }

       @Override
       public boolean existsById(Long aLong) {
           return false;
       }

       @Override
       public Iterable<Company> findAll() {
           return null;
       }

       @Override
       public Iterable<Company> findAllById(Iterable<Long> iterable) {
           return null;
       }

       @Override
       public long count() {
           return 0;
       }

       @Override
       public void deleteById(Long aLong) {

       }

       @Override
       public void delete(Company company) {

       }

       @Override
       public void deleteAll(Iterable<? extends Company> iterable) {

       }

       @Override
       public void deleteAll() {

       }
   };
   private UserService us = new UserService(userRepository, companyRepository);

    UserServiceTest() throws IOException {
    }

    @Test
    void generatePassword() {
        assertEquals(11, us.generatePassword(11).length());
    }
}