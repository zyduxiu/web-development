package com.spacestore.Dao;

import com.spacestore.Entity.Carttable;

import java.util.List;

public interface CartDaos {
	public void saveCart(Carttable carttable);

	public Carttable findByName(String name);
}
