package com.spacestore.repository;
import com.spacestore.Entity.Loginuser;
import com.spacestore.Entity.bookimage;
import com.spacestore.Entity.logintable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.Query;

public interface LoginUserRepository extends JpaRepository<logintable, String> {
    @Query("{ 'username' : ?0 }")
    logintable findByUsername(String username);
}
