package com.spacestore.repository;
import com.spacestore.Dao.logintable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginUserRepository extends JpaRepository<logintable, String> {

}
