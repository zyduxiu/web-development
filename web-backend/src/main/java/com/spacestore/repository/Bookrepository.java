package com.spacestore.repository;

import com.spacestore.Dao.booktable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Bookrepository extends JpaRepository<booktable, Integer> {

}
