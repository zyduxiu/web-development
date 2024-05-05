package com.spacestore.Dao;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
@Data
@Table(name="ordertable")
@Entity
public class ordertable {
    @Id
    private int order_id;

    @ManyToOne
    @JoinColumn(name = "username", referencedColumnName = "username")
    @JsonIgnore
    private logintable loginuser;

    @OneToMany(targetEntity = orderItem.class)
    @JoinColumn(name = "order_table",referencedColumnName = "link_id")
    private List<orderItem> OrderItems;

    private int link_id;
    private String buyer;
    private String phonenumber;
    private String address;
    private Date time;
}
