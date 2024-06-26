package com.spacestore.Dao;
import com.spacestore.DTO.userDto;
public interface UserDaos {
    public userDto getuserDto(String username);
    public boolean signupuser(String username,String email,String password);
    public void changeuserDto(String name,String surname,String instruction,String imageUrl);
}
