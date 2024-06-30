package com.spacestore.DaoImpl;

import com.spacestore.Dao.OrderDaos;
import com.spacestore.Entity.Userauth;
import com.spacestore.Entity.ordertable;
import com.spacestore.repository.OrderRepository;
import com.spacestore.repository.UserauthRepository;
import jakarta.annotation.Resource;

import java.util.List;

public class OrderDao implements OrderDaos {
	@Resource
	OrderRepository orderRepository;

	@Resource
	UserauthRepository userauthRepository;

	public void save(ordertable order){
		orderRepository.save(order);
	}

	public List<ordertable> findByName(String name){
		return userauthRepository.findByUsername(name).getorders();
	}

	public List<ordertable> findall(){
		return orderRepository.findAll();
	}
}
