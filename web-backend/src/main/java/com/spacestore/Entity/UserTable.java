package com.spacestore.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="usertable")
public class UserTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String Surname;
    private String name;
    private String Email;
    private String instruction;
    private Boolean forbid;

    @OneToOne(targetEntity = Userauth.class,mappedBy = "userInformation",cascade = CascadeType.ALL)
    Userauth loginuser;

    @OneToOne(targetEntity = UserImage.class,mappedBy = "user",cascade = CascadeType.ALL)
    UserImage userImage;

}
