package com.spacestore.Service;
import com.spacestore.Dao.booktable;
import com.spacestore.repository.Bookrepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BooksServiceA implements BooksService{
    @Resource
    Bookrepository bookrepository;
    public List<booktable> getBooks(){
        return bookrepository.findAll();
    }
}
