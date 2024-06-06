package com.spacestore.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class bookdto {
        @Id
        private int id;
        private String title;
        private int price;
        private String imageUrl;
        private String author;
        private String instruction;
        private int amount;
}
