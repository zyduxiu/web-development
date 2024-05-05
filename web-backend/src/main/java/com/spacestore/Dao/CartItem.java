package com.spacestore.Dao;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Data
@Table(name="carttable")
public class CartItem {
    @Id
    private int cartitem_id;
    private int book_id;
    private int amount;
}
