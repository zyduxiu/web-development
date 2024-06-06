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
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        setSearch(searchitem);
    }, [searchitem]);

    useEffect(() => {
        fetchBooks();
    }, [currentPage]);

    useEffect(() => {
        fetchsearchBooks();
    }, [search]);

    const fetchBooks = async () => {
        console.log("im hrer")
        let lists = await getbooks(currentPage, pageSize);
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
        let lists = await handlesearch(search);
        setPageCount(1);
        setBooks(lists);
      // console.log(lists.content.length)
      //  let x=lists.content.length;
      //  console.log(x);
       // setPageCount(x);
    };

    const onChange = (pageNumber) => {
        setCurrentPage(pageNumber-1);
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
                    {Books.map((book) => (


                        // <Space size={0}>
                        <Card style={{
                            width: '260px'
                        }}>
                            <Link to={`/book/${book.id}`}>
                                <li key={book.id} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginLeft: '30px',
                                    marginTop: '20px',
                                    border: '1px, grey'
                                }}>

                                    <img src={book.imageUrl} alt={book.title}
                                         style={{width: '200px', height: '250px'}}/>
                                    <b>{book.title}</b>
                                    <p2>{book.price}元</p2>

                                </li>
                            </Link>
                        </Card>
                        // </Space>
                        // </div>
                    ))}

                </ul>
                <div style={{
                    marginLeft:'40%',marginTop:'40px'
                }}>
                <Pagination showQuickJumper defaultCurrent={1} total={10*pageCount} onChange={onChange} />
                </div>
            </div>
        );
    }
}