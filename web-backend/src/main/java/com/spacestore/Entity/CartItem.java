package com.spacestore.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@Table(name="carttable")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartitem_id;
    private int bookid;
    private int amount;

    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    Carttable carttable;
}
