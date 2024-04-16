import React from 'react'
import {Table, Button, Input, Card} from 'antd'
import {Link} from 'react-router-dom'
import '../css/button.css'
import Orders from "./orders";
const { Column, ColumnGroup } = Table

export default function Orderlist(){
    return(
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <b style={{
                    fontSize: '2rem',
                    paddingLeft: '1%'
                }}>My</b>
                <b style={{
                    fontSize: '2rem',
                    paddingLeft: '1%'
                }}>Shopping</b>
                <b style={{
                    fontSize: '2rem',
                    paddingLeft: '1%'
                }}>List</b>
            </div>
            <Table dataSource={Orders()} style={{
                marginTop:'2%'
            }}  expandable={{
                expandedRowRender: (record) => (

                        <ul /* 三列，每列占据可用空间的相等部分 */
                            /* 定义网格项之间的间距 */ style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap'
                        }}>
                            {

                                record.books.map((book)=>(
                                    <Card>

                                            <Link to={`/book/${book.id-1}`}>
                                                <li key={book.id} style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'top',
                                                    // marginLeft: '30px',
                                                    // marginTop: '20px',
                                                    border: '1px, grey'
                                                }}>

                                                    <img src={book.imageUrl} alt={book.title}
                                                         style={{width: '75px', height: '100px', marginRight: '20px'}}/>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'left'
                                                    }}>
                                                        <b style={{marginTop: '20px'}}>{book.title}</b>
                                                        <b style={{marginTop: '15px'}}>数量： {book.amount}</b>
                                                    </div>
                                                    <Button type="primary" style={{
                                                        position:'absolute',
                                                        marginTop: '30px',
                                                        marginLeft: '80%'
                                                    }}>Buy again</Button>
                                                </li>

                                    </Link>
                                </Card>
                                )
                                )
                            }
                        </ul>
                ),
                rowExpandable: (record) => record.name !== 'Not Expandable',
            }}>
            <Column title="购买人" dataIndex="customer" key="customer"/>
            <Column title="联系电话" dataIndex="phonecall" key="phonecall"/>
                <Column title="收货地址" dataIndex="dest" key="dest"/>
                <Column title="下单时间" dataIndex="time" key="time"/>
            </Table>

        </div>
    );




}