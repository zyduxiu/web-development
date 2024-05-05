package com.spacestore.Dao;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Table(name="carts")
@Data
public class Carttable {
    @Id
    @Column(name="user_id")
    private int user_id;


    @OneToMany(targetEntity = CartItem.class)
    @JoinColumn(name = "cart_books",referencedColumnName = "user_id")
    private List<CartItem> cartItems;

}
