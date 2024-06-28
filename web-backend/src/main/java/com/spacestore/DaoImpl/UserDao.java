package com.spacestore.DaoImpl;

import com.spacestore.Dao.UserDaos;
import com.spacestore.Entity.*;
import com.spacestore.repository.CartRepository;
import com.spacestore.repository.UserauthRepository;
import com.spacestore.repository.UserImageRepository;
import com.spacestore.repository.UserTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spacestore.Default.defaultpic;
import com.spacestore.DTO.userDto;
@Service
public class UserDao implements UserDaos {
    @Autowired
    UserImageRepository userImageRepository;
    @Autowired
    UserTableRepository userTableRepository;
    @Autowired
    UserauthRepository userauthRepository;
    @Autowired
    CartRepository cartRepository;
    @Override
    public userDto getuserDto(String username) {
        UserTable userTable = userTableRepository.findByName(username);
        userDto userDto = new userDto();
        if (userImageRepository.findByIdCustom(userTable.getId()) == null) {
            userDto.setImageUrl(defaultpic.defaultval);
        } else {
            userDto.setImageUrl(userImageRepository.findByIdCustom(userTable.getId()).getImageUrl());
        }
        userDto.setName(userTable.getName());
        userDto.setEmail(userTable.getEmail());
        userDto.setForbid(userTable.getForbid());
        userDto.setSurname(userTable.getSurname());
        userDto.setInstruction(userTable.getInstruction());
        return userDto;
    }

    @Override
    public void changeuserDto(String name, String surname, String instruction, String imageUrl) {
        UserTable userTable = userTableRepository.findByName(name);
        userTable.setSurname(surname);
        userTable.setInstruction(instruction);
        userTableRepository.save(userTable);
        int userid = userTable.getId();
        UserImage userImage = userImageRepository.findByIdCustom(userid);
        if (userImage == null) {
            UserImage tmp = new UserImage();
            tmp.setImageUrl(imageUrl);
            tmp.setUserid(userTable.getId());
            tmp.setUser(userTable);
            userImageRepository.save(tmp);
        } else {
            userImage.setImageUrl(imageUrl);
            userImageRepository.save(userImage);
        }
    }

    public boolean signupuser(String username, String email, String password) {
        UserTable userTable = userTableRepository.findByName(username);
        if(userTable!=null) {
            return false;
        } else {
            UserTable userTable1=new UserTable();
            userTable1.setName(username);
            userTable1.setEmail(email);
            userTable1.setForbid(true);
            userTableRepository.save(userTable1);
            Userauth userauth=new Userauth();
            userauth.setId(userTable1.getId());
            userauth.setPassword(password);
            userauth.setUsername(username);
            userauth.setRoles("CUSTOMER");
            userauthRepository.save(userauth);
            Carttable carttable=new Carttable();
            carttable.setUserid(userauth.getId());
            carttable.setUser(userauth);
            cartRepository.save(carttable);
            userauth.setCart(carttable);
            return true;
        }

    }
}
