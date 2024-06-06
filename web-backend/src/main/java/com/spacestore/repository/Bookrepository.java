package com.spacestore.repository;

import com.spacestore.Entity.Userauth;
import com.spacestore.Entity.booktable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Bookrepository extends JpaRepository<booktable, Integer> {
    @Query("SELECT b FROM booktable b WHERE b.title LIKE CONCAT('%', :searchTerm, '%')")
    List<booktable> findByTitleLike(@Param("searchTerm") String searchTerm);

    @Query("select b FROM booktable b WHERE b.id = :bookid")
    booktable findByBookid(@Param("bookid") int bookid);


}
