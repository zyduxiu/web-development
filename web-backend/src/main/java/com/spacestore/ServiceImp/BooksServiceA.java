package com.spacestore.ServiceImp;
import com.spacestore.Dao.BookDao;
import com.spacestore.Entity.bookimage;
import com.spacestore.Service.BooksService;
import com.spacestore.Dao.BookDaos;
import com.spacestore.Entity.bookdto;
import com.spacestore.Entity.booktable;
import com.spacestore.repository.Bookimagerepository;
import com.spacestore.repository.Bookrepository;
import jakarta.annotation.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BooksServiceA implements BooksService{
    @Resource
    BookDaos bookDaos;

    @Resource
    Bookrepository bookrepository;

    @Resource
    Bookimagerepository bookimagerepository;
    public Page<bookdto> getBooks(Pageable pageable){
        Page<booktable> booksPage = bookrepository.findAll(pageable);
        return booksPage.map(book -> {
            bookdto bookDTO = new bookdto();
            bookDTO.setId(book.getId());
            bookDTO.setAuthor(book.getAuthor());
            bookDTO.setTitle(book.getTitle());
            bookDTO.setPrice(book.getPrice());
            bookDTO.setAmount(book.getAmount());
            bookDTO.setInstruction(book.getInstruction());
            if (bookimagerepository.findByIdCustom(book.getId()) != null) {
                bookDTO.setImageUrl(bookimagerepository.findByIdCustom(book.getId()).getImageUrl());
            }
            return bookDTO;
        });
    }

    public List<bookdto> getSearchBooks(String searchtitle){
        return bookDaos.returnSearchedbooks(searchtitle);
    }

     public void alterbookInventory(int book_id,String title,String author,int amount,int price,String imageUrl,String instruction){
            booktable book = bookrepository.findByBookid(book_id);
            if(instruction!=null) {
                book.setInstruction(instruction);
            }
            if(author!=null) {
                book.setAuthor(author);
            }
            if(title!=null) {
                book.setTitle(title);
            }
            if(price!=-1) {
                book.setPrice(price);
            }
            if(amount!=-1) {
                book.setAmount(amount);
            }
            bookrepository.save(book);
            bookimage bookimage=bookimagerepository.findByIdCustom(book_id);
            if(imageUrl!=null) {
                bookimage.setImageUrl(imageUrl);
            }
            bookimagerepository.save(bookimage);
    }

    public void addBook(String title,String author,int amount,int price,String imageUrl,String instruction){
        booktable newbook=new booktable();
        newbook.setTitle(title);
        newbook.setAuthor(author);
        newbook.setPrice(price);
        newbook.setAmount(amount);
        newbook.setInstruction(instruction);
        newbook.setSales(0);
        bookrepository.save(newbook);
        bookimage newimage=new bookimage();
        List<booktable> tmp=bookrepository.findByTitleLike(title);
        booktable tmpbook=tmp.get(0);
        int id=tmpbook.getId();
        newimage.setImageUrl(imageUrl);
        newimage.setBook_id(id);
        bookimagerepository.save(newimage);
    }

    public void deleteInventory(int id){
        booktable delbook=new booktable();
        delbook=bookrepository.findByBookid(id);
        bookrepository.delete(delbook);
        bookimage delimage=bookimagerepository.findByIdCustom(id);
        bookimagerepository.delete(delimage);
    }
}
