package com.spacestore.ServiceImp;
import com.spacestore.Dao.BookDao;
import com.spacestore.Entity.bookimage;
import com.spacestore.Service.BooksService;
import com.spacestore.Dao.BookDaos;
import com.spacestore.DTO.bookdto;
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
            bookDTO.setDeleted(book.isDeleted());
            bookDTO.setISBN(book.getISBN());
            if (bookimagerepository.findByIdCustom(book.getId()) != null) {
                bookDTO.setImageUrl(bookimagerepository.findByIdCustom(book.getId()).getImageUrl());
            }
            return bookDTO;
        });
    }

    public List<bookdto> getSearchBooks(String searchtitle){
        return bookDaos.returnSearchedbooks(searchtitle);
    }

     public boolean alterbookInventory(int book_id,String title,String author,int amount,int price,String imageUrl,String instruction,String ISBN){
            booktable book = bookrepository.findByBookid(book_id);
            if(bookrepository.findByTitle(title)!=null){
                return false;
            }
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
            if(ISBN!=null){
                book.setISBN(ISBN);
            }
            bookrepository.save(book);
            bookimage bookimage=bookimagerepository.findByIdCustom(book_id);
            if(imageUrl!=null) {
                bookimage.setImageUrl(imageUrl);
            }
            bookimagerepository.save(bookimage);
            return true;
    }

    public boolean addBook(String title,String author,int amount,int price,String imageUrl,String instruction,String ISBN){
        booktable newbook=new booktable();
        if(bookrepository.findByTitle(title)!=null){
            return false;
        }
        newbook.setTitle(title);
        newbook.setAuthor(author);
        newbook.setPrice(price);
        newbook.setAmount(amount);
        newbook.setInstruction(instruction);
        newbook.setSales(0);
        newbook.setDeleted(false);
        newbook.setISBN(ISBN);
        bookrepository.save(newbook);
        bookimage newimage=new bookimage();
        List<booktable> tmp=bookrepository.findByTitleLike(title);
        booktable tmpbook=tmp.get(0);
        int id=tmpbook.getId();
        newimage.setImageUrl(imageUrl);
        newimage.setBook_id(id);
        bookimagerepository.save(newimage);
        return true;
    }

    public void deleteInventory(int id){
        booktable delbook=new booktable();
        delbook=bookrepository.findByBookid(id);
        delbook.setDeleted(!delbook.isDeleted());
        bookrepository.save(delbook);
    }
}
