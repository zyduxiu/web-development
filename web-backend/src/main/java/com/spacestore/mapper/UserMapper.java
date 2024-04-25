package com.spacestore.mapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import com.spacestore.Loginpojo.Loginuser;
import java.util.List;
@Mapper
public interface UserMapper {

@Select("select * from loginuser where username=#{username}&password=#{password}")
Loginuser findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
}
