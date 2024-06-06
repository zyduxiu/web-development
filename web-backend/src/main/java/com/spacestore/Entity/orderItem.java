package com.spacestore.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;


@Entity
@Table(name="Orderitem")
@Data
public class orderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderItemid;
    private int book_id;
    private int amount;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    @JsonIgnore
    @ToString.Exclude
    private ordertable orderTable;
}
