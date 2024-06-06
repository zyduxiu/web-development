package com.spacestore.repository;

import com.spacestore.Entity.UserImage;
import com.spacestore.Entity.bookimage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserImageRepository extends MongoRepository<UserImage, String> {
    @Query("{ 'userid' : ?0 }")
   UserImage findByIdCustom(Integer id);
}
