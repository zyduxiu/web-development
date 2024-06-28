package com.spacestore.Service;
import java.util.List;
import com.spacestore.DTO.bookdto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BooksService {
    public Page<bookdto> getBooks(Pageable pageable);

    public Page<bookdto>getSearchBooks(String searchtitle,Pageable pageable);

    public boolean alterbookInventory(int book_id,String title,String author,int amount,int price,String imageUrl,String instruction,String ISBN);

    public boolean addBook(String title,String author,int amount,int price,String imageUrl,String instruction,String ISBN);

    public void deleteInventory(int id);
}
