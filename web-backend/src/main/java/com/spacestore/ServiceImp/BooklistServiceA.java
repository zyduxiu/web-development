package com.spacestore.ServiceImp;
import com.spacestore.Service.BooklistService;
import com.spacestore.Dao.BookDaos;
import com.spacestore.Entity.bookdto;
import jakarta.annotation.Resource;
import com.spacestore.repository.Bookrepository;
import org.springframework.stereotype.Service;

@Service
public class BooklistServiceA implements BooklistService{
    @Resource
    private BookDaos bookDaos;

    @Override
    public bookdto getBooklist(int id){

//        return booklistMapper.getbooklist(id);
        return bookDaos.returnBookdto(id);
    }

}
