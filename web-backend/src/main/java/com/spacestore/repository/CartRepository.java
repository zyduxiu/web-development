package com.spacestore.repository;

import com.spacestore.Entity.Carttable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CartRepository extends JpaRepository<Carttable, Integer> {
    @Query("{ 'userid' : ?0 }")
    Carttable findByUserid(int userid);
}
