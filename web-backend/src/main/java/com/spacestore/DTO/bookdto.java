package com.spacestore.DTO;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class bookdto {
        @Id
        private int id;
        private String title;
        private int price;
        private String imageUrl;
        private String author;
        private String instruction;
        private int amount;
        private boolean deleted;
        private String ISBN;
}
