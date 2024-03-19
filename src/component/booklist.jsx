import React from 'react'
import {Layout, Space} from 'antd'
import {Card} from 'antd'
import {useState} from "react";
import Books from "./books";
import {Link} from 'react-router-dom'
export default function Booklist(){
    return(
        <div>
        <ul>
            {Books().map((book) => (


                <Space size={0}>
                    <Card>
                    <Link to={`/book/${book.id}`}>
                    <li key={book.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,marginLeft:'30px',marginTop:'20px',border:'1px, grey'}}>

                        <img src={book.imageUrl} alt={book.title}  style={{ width: '200px', height: '250px'}} />
                    <b>{book.title}</b>
                        <p2>{book.price}元</p2>

                </li>
                    </Link>
                    </Card>
                 </Space>
                // </div>
                ))}

        </ul>
    </div>
    );
}