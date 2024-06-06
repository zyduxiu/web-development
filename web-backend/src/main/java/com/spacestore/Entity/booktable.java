package com.spacestore.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="booktable")
public class booktable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private int price;
    private String author;
    private String instruction;
    private int amount;
    private int sales=0;
}

