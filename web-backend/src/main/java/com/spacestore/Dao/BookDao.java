package com.spacestore.Dao;

import com.spacestore.repository.Bookimagerepository;
import com.spacestore.repository.Bookrepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.spacestore.Entity.bookdto;
import com.spacestore.Entity.booktable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class BookDao implements BookDaos{
    @Autowired
    Bookimagerepository bookimagerepository;
    @Autowired
    Bookrepository bookrepository;
    public bookdto returnBookdto(int id){
     //   System.out.println(bookimagerepository.findByIdCustom(1));
        bookdto book=new bookdto();
        book.setId(id);
        book.setAuthor(bookrepository.getReferenceById(id).getAuthor());
        book.setTitle(bookrepository.getReferenceById(id).getTitle());
        book.setPrice(bookrepository.getReferenceById(id).getPrice());
        book.setInstruction(bookrepository.getReferenceById(id).getInstruction());
        book.setAmount(bookrepository.getReferenceById(id).getAmount());
       // System.out.println(book.getPrice());
        if(bookimagerepository.findByIdCustom(id)!=null){
            book.setImageUrl(bookimagerepository.findByIdCustom(id).getImageUrl());
        }
        return book;
    }
    public List<bookdto> returnallbooks(){
        List<booktable> books = bookrepository.findAll();

        List<bookdto> bookDTOs = new ArrayList<>();

        for (booktable book : books) {
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

            bookDTOs.add(bookDTO);
        }
        return bookDTOs;
    }

    public List<bookdto> returnSearchedbooks(String searchtitle){
        List<bookdto> bookDTOs = new ArrayList<>();
        List<booktable> Booktables=bookrepository.findByTitleLike(searchtitle);
        for(booktable book:Booktables){
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
            bookDTOs.add(bookDTO);
        }
        return bookDTOs;
    }


}
