package com.spacestore.DaoImpl;

import com.spacestore.Dao.BookDaos;
import com.spacestore.repository.Bookimagerepository;
import com.spacestore.repository.Bookrepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.spacestore.DTO.bookdto;
import com.spacestore.Entity.booktable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
        book.setDeleted(bookrepository.getReferenceById(id).isDeleted());
        book.setISBN(bookrepository.getReferenceById(id).getISBN());
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
            bookDTO.setDeleted(book.isDeleted());
            bookDTO.setISBN(book.getISBN());
            if (bookimagerepository.findByIdCustom(book.getId()) != null) {
                bookDTO.setImageUrl(bookimagerepository.findByIdCustom(book.getId()).getImageUrl());
            }

            bookDTOs.add(bookDTO);
        }
        return bookDTOs;
    }

    public Page<bookdto> returnSearchedbooks(String searchtitle, Pageable pageable){
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
            bookDTO.setDeleted(book.isDeleted());
            bookDTO.setISBN(book.getISBN());
            if (bookimagerepository.findByIdCustom(book.getId()) != null) {
                bookDTO.setImageUrl(bookimagerepository.findByIdCustom(book.getId()).getImageUrl());
            }
            bookDTOs.add(bookDTO);
        }
        int totalElements = bookDTOs.size();
        Sort sort = pageable.getSort();
        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int startOffset = pageNumber * pageSize;

        // 确保开始偏移量不会超出结果列表的大小
        if (startOffset >= totalElements) {
            startOffset = 0;
        }

        List<bookdto> pagedResult = new ArrayList<>();
        for (int i = startOffset; i < Math.min(startOffset + pageSize, totalElements); i++) {
            pagedResult.add(bookDTOs.get(i));
        }

        // 创建并返回分页对象
        return new PageImpl<>(pagedResult, pageable, totalElements);
    }


}
