package com.spacestore.Service;
import com.spacestore.Dao.booktable;
import jakarta.annotation.Resource;
import com.spacestore.repository.Bookrepository;
import org.springframework.stereotype.Service;

@Service
public class BooklistServiceA implements BooklistService{
    @Resource
    private Bookrepository bookrepository;

    @Override
    public booktable getBooklist(int id){

//        return booklistMapper.getbooklist(id);
        return bookrepository.findById(id).orElse(null);
    }

}
