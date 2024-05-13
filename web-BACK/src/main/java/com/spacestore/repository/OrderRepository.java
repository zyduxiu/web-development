package com.spacestore.repository;

import com.spacestore.Entity.ordertable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<ordertable,String> {

    @Query("SELECT MAX(p.order_id) FROM ordertable p")
    Integer findMaxId();
}
