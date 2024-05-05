package com.spacestore.repository;

import com.spacestore.Dao.ordertable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<ordertable,String> {
}
