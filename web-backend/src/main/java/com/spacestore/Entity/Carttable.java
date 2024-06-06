package com.spacestore.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;
@Entity
@Table(name="carts")
@Data
public class Carttable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="userid")
    private Integer userid;


    @OneToMany(mappedBy = "carttable", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems;

    @OneToOne
    @JsonIgnore
    @ToString.Exclude
    private Userauth user;

}


