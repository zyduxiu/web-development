package com.spacestore.Dao;
import com.spacestore.DTO.bookdto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
public interface BookDaos {
    public bookdto returnBookdto(int id);
    public List<bookdto> returnallbooks();

    public Page<bookdto> returnSearchedbooks(String searchtitle,Pageable pageable);


}
