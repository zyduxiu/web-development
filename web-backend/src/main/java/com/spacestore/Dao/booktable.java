package com.spacestore.Dao;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="booktable")
public class booktable {
    @Id
    private int id;
    private String title;
    private int price;
    private String imageUrl;
    private String author;
    private String instruction;
}
