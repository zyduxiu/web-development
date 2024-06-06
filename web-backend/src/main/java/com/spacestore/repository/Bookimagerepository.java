package com.spacestore.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.spacestore.Entity.bookimage; // 假设你的实体类是BookImage
import org.springframework.data.mongodb.repository.Query;

public interface Bookimagerepository extends MongoRepository<bookimage, String> {
    @Query("{ 'book_id' : ?0 }")
    bookimage findByIdCustom(Integer id);

}