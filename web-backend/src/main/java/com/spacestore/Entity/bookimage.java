package com.spacestore.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.bson.types.ObjectId;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookimg")
@Data
public class bookimage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String  _id;
    private String imageUrl;
    private Integer book_id;
}
