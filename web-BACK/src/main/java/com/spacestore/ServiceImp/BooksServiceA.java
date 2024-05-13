package com.spacestore.Service;
import com.spacestore.Dao.BookDaos;
import com.spacestore.Entity.bookdto;
import com.spacestore.repository.Bookrepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BooksServiceA implements BooksService{
    @Resource
    BookDaos bookDaos;
    public List<bookdto> getBooks(){
        return bookDaos.returnallbooks();
    }
}
