import React, {useEffect} from 'react'
import {Layout, Space} from 'antd'
import '../css/booklist.css'
import {Card} from 'antd'
import {useState} from "react";
import {Link} from 'react-router-dom'
import Books from './books'
import getbooks from "../services/common";
import detail from "../services/getbook";
export default function Booklist(){
    // Books
    // const [Books, setBooks] = useState(null);
    // const fetchBooks=async ()=>{
    //     let lists = await getbooks();
    //     setBooks(lists);
    //     console.log(lists);
    //     // setImageUrl(lists.imageUrl);
    // }
    //
    // useEffect(()=>{
    //     fetchBooks();}, []);
    if(Books()!==null) {
        return (
            <div>
                <ul /* 三列，每列占据可用空间的相等部分 */
                    /* 定义网格项之间的间距 */ style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {Books().map((book) => (


                        // <Space size={0}>
                        <Card style={{
                            width: '280px'
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
            </div>
        );
    }
}