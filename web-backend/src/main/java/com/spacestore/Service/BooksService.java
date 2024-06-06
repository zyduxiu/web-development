package com.spacestore.Service;
import java.util.List;
import com.spacestore.Entity.bookdto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BooksService {
    public Page<bookdto> getBooks(Pageable pageable);

    public List<bookdto>getSearchBooks(String searchtitle);

    public void alterbookInventory(int book_id,String title,String author,int amount,int price,String imageUrl,String instruction);

    public void addBook(String title,String author,int amount,int price,String imageUrl,String instruction);

    public void deleteInventory(int id);
}
