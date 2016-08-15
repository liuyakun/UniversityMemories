package com.universityMemories.repository;

import com.universityMemories.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Integer> {

    User findById(int id);

    User findByName(String name);

    User findByPhone(String phone);

    @Query("select u from User u where" +
            " (?1 is null or u.id = ?1)" +
            " and (?2 is null or u.name = ?2)" +
            " and (?3 is null or u.address = ?3)" +
            " and (?4 is null or u.phone = ?4)"
    )
    Page<User> findByKeys(Integer uid, String name, String address, String phone, Pageable p);


}