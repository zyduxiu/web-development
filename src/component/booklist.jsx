import React, { useEffect, useState } from 'react';
import { Layout, Pagination, Space } from 'antd';
import '../css/booklist.css';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import Books from './books';
import getbooks from "../services/common";
import detail from "../services/getbook";
import { handlesearch } from "../services/handlesearch";
import ReactPaginate from 'react-paginate';

export default function Booklist({ searchitem }) {
    let [Books, setBooks] = useState(null);
    const [search, setSearch] = useState();
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        setSearch(searchitem);
    }, [searchitem]);

    // useEffect(() => {
    //     fetchBooks();
    // }, [currentPage]);

    useEffect(() => {
        fetchsearchBooks();
    }, [currentPage]);
    useEffect(() => {
        setCurrentPage(1);
        fetchsearchBooks2();
    }, [search]);

    const fetchBooks = async () => {
        console.log("im hrer")
        let lists = await getbooks(currentPage-1, pageSize);
        setPageCount(Math.ceil(lists.length / 10));
        setBooks(lists.content);
        console.log(lists.content.length)
        let x=lists.totalElements;
        console.log(x);
        console.log(pageSize)
        setPageCount(Math.ceil(x / pageSize));
        console.log(pageCount);
    };
    console.log(pageCount);
    const fetchsearchBooks = async () => {
        console.log("im hrer")
        let lists = await handlesearch(searchitem,currentPage-1,pageSize);
        setPageCount(Math.ceil(lists.length / 10));
        setBooks(lists.content);
        console.log(lists.content.length)
        let x=lists.totalElements;
        console.log(x);
        console.log(pageSize)
        setPageCount(Math.ceil(x / pageSize));
        console.log(pageCount);
      // console.log(lists.content.length)
      //  let x=lists.content.length;
      //  console.log(x);
       // setPageCount(x);
    };
    const fetchsearchBooks2 = async () => {
        console.log("im hrer")
        let lists = await handlesearch(searchitem,0,pageSize);
        setPageCount(Math.ceil(lists.length / 10));
        setBooks(lists.content);
        console.log(lists.content.length)
        let x=lists.totalElements;
        console.log(x);
        console.log(pageSize)
        setPageCount(Math.ceil(x / pageSize));
        console.log(pageCount);
        // console.log(lists.content.length)
        //  let x=lists.content.length;
        //  console.log(x);
        // setPageCount(x);
    };

    const onChange = (pagination) => {
        setCurrentPage(pagination);
    };
    console.log(Books);
    if(Books) {
        return (
            <div>
                <ul style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {Books.map((book) => {
                        // 如果书籍被删除，显示带遮罩层的卡片
                        if (book.deleted) {
                            return (
                                <Card style={{ width: '260px' }} key={book.id}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            marginLeft: '30px',
                                            marginTop: '20px',
                                            position: 'relative',
                                        }}>
                                            <img src={book.imageUrl} alt={book.title} style={{ width: '200px', height: '250px' }} />
                                            {/* 遮罩层 */}
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '24px',
                                                color: 'red',
                                                fontWeight: 'bold',
                                            }}>
                                                书籍已下架
                                            </div>
                                            <b>{book.title}</b>
                                            <p>{book.price/100}元</p>
                                        </div>
                                </Card>
                            );
                        } else {
                            // 如果书籍未被删除，只显示书籍信息
                            return (
                                <Card style={{ width: '260px' }} key={book.id}>
                                    <Link to={`/book/${book.id}`}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            marginLeft: '30px',
                                            marginTop: '20px',
                                            position: 'relative',

                                        }}>
                                            <img src={book.imageUrl} alt={book.title} style={{ width: '200px', height: '250px' }} />
                                            <b>{book.title}</b>
                                            <p>{book.price/100}元</p>
                                        </div>
                                    </Link>
                                </Card>
                            );
                        }
                    })}



                </ul>
                <div style={{
                    marginLeft:'40%',marginTop:'40px'
                }}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={pageCount*pageSize}
                        onChange={onChange}
                    />
                </div>
            </div>
        );
    }
}