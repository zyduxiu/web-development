package com.spacestore.repository;

import com.spacestore.Dao.Carttable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.xml.transform.sax.SAXResult;

public interface CartRepository extends JpaRepository<Carttable, String> {

}
