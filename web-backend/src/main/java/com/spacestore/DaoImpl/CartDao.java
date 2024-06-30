package com.spacestore.DaoImpl;

import com.spacestore.Entity.Carttable;
import com.spacestore.repository.CartRepository;
import com.spacestore.repository.UserauthRepository;
import jakarta.annotation.Resource;

public class CartDao {
	@Resource
	CartRepository cartRepository;

	@Resource
	UserauthRepository userauthRepository;

	public void saveCart(Carttable carttable){
		cartRepository.save(carttable);
	}

	public Carttable findByName(String name){
		return userauthRepository.findByUsername(name).getcart();
	}
}
