package com.spacestore.Dao;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name="Orderitem")
@Data
public class orderItem {
    @Id
    private int orderid;
    private int book_id;
    private int amount;
}
