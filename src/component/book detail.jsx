import React, { useEffect, useState } from 'react';
import Books from './books'
import {Space,Button} from "antd";
import {Link} from 'react-router-dom'
import Commentblock from "./commentblock";
function BookDetail(targetId) {
    const [selectedBook, setSelectedBook] = useState(null);

    const pg=targetId-1
    const book=Books()[pg]
    return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'left'}}>
        <div style={{display:'flex',flexDirection:'row'}}>
                <img src={require(`../pic/${book.imageUrl}`)} style={{
                    width: '30%',height: '40%',
                    marginLeft:'50px',marginRight:'50px',
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
                        <text style={{fontSize: '1rem', color: 'red', marginTop: '10px', marginLeft: '60px'}}>￥</text>
                        <text style={{fontSize: '2rem', color: 'red'}}>{book.price}</text>
                    </div>
                </div>
                <div>
                    <Button size='large' style={{
                        marginTop: '50px',
                    }}>加入购物车</Button>
                    <Button style={{marginLeft:'25px'}} size='large' type='primary'>在线购买</Button>
                </div>
            </Space>
        </div>
    <Commentblock/>
    </div>

);
}

export default BookDetail;