package com.spacestore.Entity;

import ch.qos.logback.core.joran.sanity.Pair;
import jakarta.persistence.Entity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class statics {
    int totalprice=0;
    int totalbooks=0;
    private List<Pair<String, Integer>> bookInfoList;

    public boolean isBookInList(String bookTitle) {
        for (Pair<String, Integer> pair : bookInfoList) {
            if (pair.getFirst().equals(bookTitle)) {
                return true;
            }
        }
        return false;
    }
    public Pair returnBookInList(String bookTitle) {
        if(bookInfoList==null){
            return null;
        }
        for (Pair<String, Integer> pair : bookInfoList) {
            if (pair.getFirst().equals(bookTitle)) {
                return pair;
            }
        }
        return null;
    }
    public void addBookInList(String bookTitle,int amount) {
        if (returnBookInList(bookTitle) != null) {
            Pair<String,Integer> pair=returnBookInList(bookTitle);
            pair.updateSecond(pair.getSecond() + amount);
        } else {
            if (bookInfoList == null) {
                bookInfoList = new ArrayList<>();
            }
            bookInfoList.add(new Pair<>(bookTitle, amount));
        }
    }
    public static class Pair<T1, T2> {
        private T1 first;
        private T2 second;

        public Pair(T1 first, T2 second) {
            this.first = first;
            this.second = second;
        }

        public T1 getFirst() {
            return first;
        }
        public T2 getSecond() {
            return second;
        }
        public void updateSecond(T2 updatedValue) {
            this.second = updatedValue;
        }


        // ... 其他方法
    }
}
