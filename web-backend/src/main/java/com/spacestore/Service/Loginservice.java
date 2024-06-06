package com.spacestore.Service;
import com.spacestore.Entity.Loginuser;
import com.spacestore.Entity.Userauth;
import com.spacestore.Entity.userDto;

import java.util.List;

public interface Loginservice {
    public Userauth checkLogin(String a, String b);

    public List<userDto> getUserlists();

    public boolean forbidsingleUser(int id);
}
