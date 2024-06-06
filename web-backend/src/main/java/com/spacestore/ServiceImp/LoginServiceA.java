package com.spacestore.ServiceImp;
import com.spacestore.Default.defaultpic;
import com.spacestore.Entity.UserImage;
import com.spacestore.Entity.UserTable;
import com.spacestore.Entity.Userauth;
import com.spacestore.Entity.userDto;
import com.spacestore.Service.Loginservice;
import com.spacestore.repository.UserImageRepository;
import com.spacestore.repository.UserTableRepository;
import com.spacestore.repository.UserauthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LoginServiceA implements Loginservice{
    @Autowired
    private UserauthRepository userauthRepository;

    @Autowired
    private UserTableRepository userTableRepository;

    @Autowired
    private UserImageRepository userImageRepository;

    public Userauth checkLogin(String username,String password){
        Userauth user=userauthRepository.findByUsernameAndPassword(username,password);
        return user;
    }

    public List<userDto> getUserlists(){
        List<userDto> returnlist=new ArrayList<>();
        List<UserTable> userTables=userTableRepository.findAll();
        for(UserTable userTable:userTables){
            int id=userTable.getId();
            String name=userTable.getName();
            Userauth userauth=userauthRepository.findByUsername(name);
            if(userauth.getRoles().equals("CUSTOMER")){
                userDto tmp=new userDto();
                tmp.setInstruction(userTable.getInstruction());
                tmp.setEmail(userTable.getEmail());
                tmp.setSurname(userTable.getSurname());
                tmp.setUserid(userTable.getId());
                tmp.setName(userTable.getName());
                tmp.setForbid(userTable.getForbid());
                UserImage userImage=userImageRepository.findByIdCustom(tmp.getUserid());
                if(userImage!=null) {
                    tmp.setImageUrl(userImage.getImageUrl());
                }
                else{
                    tmp.setImageUrl(defaultpic.defaultval);
                }
                returnlist.add(tmp);
            }
        }
        return returnlist;
    }

    public boolean forbidsingleUser(int id){
        UserTable userTable=userTableRepository.findById(id);
        userTable.setForbid(!userTable.getForbid());
        userTableRepository.save(userTable);
        return userTable.getForbid();
    }
}
