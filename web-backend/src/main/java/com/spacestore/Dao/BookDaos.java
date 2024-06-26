package com.spacestore.Dao;
import com.spacestore.DTO.bookdto;
import java.util.List;
public interface BookDaos {
    public bookdto returnBookdto(int id);
    public List<bookdto> returnallbooks();

    public List<bookdto> returnSearchedbooks(String searchtitle);


}
