package com.spacestore.repository;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SignupMapper {
    @Insert("insert into newdatabase.logintable(username, password) values (#{username}, #{password})")
    int insertLoginUser(@Param("username") String username, @Param("password") String password);
}


