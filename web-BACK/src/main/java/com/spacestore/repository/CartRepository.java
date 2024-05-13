package com.spacestore.repository;

import com.spacestore.Entity.CartItem;
import com.spacestore.Entity.Carttable;
import com.spacestore.Entity.orderItem;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CartRepository extends JpaRepository<Carttable, String> {
}
