package com.spacestore.Dao;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Entity
@Data
@Table(name="logintable")
public class logintable {
  @Id
  public String username;

  public String password;

  @OneToMany(targetEntity = ordertable.class,mappedBy = "loginuser",cascade = CascadeType.ALL)
  private List<ordertable> OrderTables;

  @OneToOne(targetEntity = Carttable.class)
  @JoinColumn(name="user_id")
  private Carttable cart;


  public Carttable getcart(){
     return cart;}

  public List<ordertable> getorders(){
     return OrderTables;
  }
}
