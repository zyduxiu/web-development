package com.spacestore.repository;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import com.spacestore.Entity.Loginuser;

@Mapper
public interface UserMapper {
@Select("select * from newdatabase.logintable where password=#{password} AND username=#{username}")
//@Select("select * from loginuser where username=#{username}&password=#{password}")
Loginuser findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
}
