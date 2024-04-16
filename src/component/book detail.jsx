import React, { useEffect, useState } from 'react';
import Books from './books'
import {Space,Button} from "antd";
import {Link} from 'react-router-dom'
import Commentblock from "./commentblock";
// import {fetchBook} from "../page/book";
import detail from "../services/getbook";
// import fetch from 'unfetch'
function BookDetail(targetId) {

    const [imageUrl, setImageUrl] = useState(null);
    // const [book, setBook] = useState(null);
    // const fetchBook=async ()=>{
    //     let data = await detail(targetId);
    //     setBook(data[0]);
    //     console.log(data);
    //     setImageUrl(data[0].imageUrl);
    // }
    //
    // useEffect(()=>{
    //     fetchBook();}, [targetId]);
    // // const book=Books()[pg]
    // console.log(book);
    let book=Books()[targetId];
    if (book != null) {
        console.log(book.price)
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img src={require(`../pic/${book.imageUrl}`)} style={{
                        width: '30%', height: '40%',
                        marginLeft: '50px', marginRight: '50px',
                    }}></img>
                    <Space size="middle" direction="vertical">
                        <b style={{
                            fontSize: '2.5rem'
                        }}>{book.title}</b>
                        <text style={{marginLeft: '100px', fontSize: '1.2rem', fontFamily: "楷体"}}>
                            基本简介:
                        </text>
                        <text style={{marginLeft: '60px', fontSize: '1.2rem', fontFamily: "楷体"}}>
                            作者: {book.author}
                        </text>
                        <text style={{marginLeft: '60px', fontSize: '1.2rem', fontFamily: "楷体"}}>
                            销量:
                        </text>
                        <text style={{marginLeft: '100px', fontSize: '1.2rem', fontFamily: "楷体"}}>
                            作品介绍:
                        </text>
                        <text style={{marginLeft: '30px', fontSize: '1rem', fontFamily: "楷体"}}>
                            {book.instruction}
                        </text>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <text style={{
                                fontSize: '1.2rem', fontFamily: "楷体"
                            }}>惊爆价 :
                            </text>
                            <div>
                                <text
                                    style={{fontSize: '1rem', color: 'red', marginTop: '10px', marginLeft: '60px'}}>￥
                                </text>
                                <text style={{fontSize: '2rem', color: 'red'}}>{book.price}</text>
                            </div>
                        </div>
                        <div>
                            <Button size='large' style={{
                                marginTop: '50px',
                            }}>加入购物车</Button>
                            <Button style={{marginLeft: '25px'}} size='large' type='primary'>在线购买</Button>
                        </div>
                    </Space>
                </div>
                <Commentblock/>
            </div>

        );
    }else{
        return <div>loading...</div>;
    }
}

export default BookDetail;