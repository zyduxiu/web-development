package com.spacestore.repository;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import com.spacestore.Entity.UserTable;
import org.springframework.data.mongodb.repository.Query;

public interface UserTableRepository extends JpaRepository<UserTable,Integer> {
    @Query("{ 'name' : ?0 }")
    UserTable findByName(String name);

    @Query("{'id' : ?0}")
    UserTable findById( int id);
}
