package com.spacestore.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@Table(name="logintable")
public class Userauth {
  @Id
  private int id;
  public String username;

  public String password;

  public String roles;

  public String jwt;

  @OneToMany(targetEntity = ordertable.class,mappedBy = "loginuser",cascade = CascadeType.ALL)
  @JsonIgnore
  private List<ordertable> OrderTables;

  @OneToOne
  @JsonIgnore
  @ToString.Exclude
  private  UserTable userInformation;

  @OneToOne(targetEntity = Carttable.class,mappedBy = "user",cascade = CascadeType.ALL)
  private Carttable cart;


  public Carttable getcart(){
     return cart;}

  public List<ordertable> getorders(){
     return OrderTables;
  }
}
