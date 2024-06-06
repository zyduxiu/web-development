package com.spacestore.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.ToString;
import org.bson.types.ObjectId;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
@Entity
@Document(collection = "userimg")
@Data
public class UserImage {
    @Id
    private String _id;
    private String imageUrl;
    private Integer userid;

    @OneToOne
    @JsonIgnore
    @ToString.Exclude
    private UserTable user;
}
