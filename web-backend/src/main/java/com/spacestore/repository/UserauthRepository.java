package com.spacestore.repository;
import com.spacestore.Entity.Userauth;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserauthRepository extends JpaRepository<Userauth, Integer> {
    Userauth findByUsername(String username);

    @Query("SELECT u FROM Userauth u WHERE u.username = :username AND u.password = :password")
    Userauth findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
}
