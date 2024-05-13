package com.spacestore.repository;

import com.spacestore.Entity.booktable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Bookrepository extends JpaRepository<booktable, Integer> {

}
