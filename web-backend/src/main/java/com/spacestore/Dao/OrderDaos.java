package com.spacestore.Dao;

import com.spacestore.Entity.ordertable;
import com.spacestore.repository.OrderRepository;
import jakarta.annotation.Resource;

import java.util.List;

public interface OrderDaos {
	public void save(ordertable order);

	public List<ordertable> findByName(String username);

	public List<ordertable> findall();
}
