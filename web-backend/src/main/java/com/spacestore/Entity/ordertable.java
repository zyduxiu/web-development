package com.spacestore.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.Date;
import java.util.List;
@Data
@Table(name="ordertable")
@Entity
public class ordertable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer order_id;


    @ManyToOne
    @JoinColumn(name = "username", referencedColumnName = "username")
    @JsonIgnore
    @ToString.Exclude
    private Userauth loginuser;

//    @OneToMany(targetEntity = orderItem.class)
//    @JoinColumn(name = "order_table",referencedColumnName = "link_id")
@OneToMany(mappedBy = "orderTable", cascade = CascadeType.ALL, orphanRemoval = true)
@ToString.Exclude
private List<orderItem> OrderItems;

    private String buyer;
    private String phonenumber;
    private String address;
    private Date time;
}
