package com.spacestore.Entity;

import com.spacestore.repository.Bookimagerepository;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class userDto {
    @Id
    private int userid;
    private String imageUrl;
    private String Surname;
    private String name;
    private String instruction;
    private String Email;
    private boolean forbid;
}
