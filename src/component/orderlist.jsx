import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Card, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import '../css/button.css';
import Orders from "./orders";
import getorder from "../services/getorder";
import detail from "../services/getbook";
import { handlesearch } from "../services/handlesearch";
import { handlesearchOrders } from "../services/handlesearchOrders";
const { Column, ColumnGroup } = Table;
const username=localStorage.getItem('username');
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search } = Input;

export default function Orderlist() {
    const [orders, setOrders] = useState(null);
    const [book, setBook] = useState(null);
    const [searchitem, setSearchitem] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let lists = await getorder(username);
                setOrders(lists);
                const bookIds = lists.map(list => list.orderItems.map(item => item.book_id));
                const promises = bookIds.map(innerIds => Promise.all(innerIds.map(iid => detail(iid))));
                const allData = await Promise.all(promises);
                const flattenedData = allData.flatMap(innerArray => innerArray);
                setBook(flattenedData);
            } catch (error) {
                console.error('获取订单失败:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const handlesearch = async () => {
            const search = {
                username: username,
                searchitem: searchitem,
                startdate: selectedDates[0] ? selectedDates[0].toDate() : null,
                enddate: selectedDates[1] ? selectedDates[1].toDate() : null,
            };

            if (search.startdate && search.enddate) {
                search.startdate = search.startdate.toISOString();
                search.enddate = search.enddate.toISOString();
            }

            try {
                const data = await handlesearchOrders(search);
                setOrders(data);
            } catch (error) {
                console.error('搜索订单失败:', error);
            }
        };

        handlesearch();

    }, [searchitem, selectedDates]);

    const onDateChange=(dates)=>{
        if (dates) {
            setSelectedDates(dates);
            console.log('选中的开始日期:', dates[0]);
            console.log('选中的结束日期:', dates[1]);
        } else {
            setSelectedDates([]);
            handlesearch();
            console.log('日期被清除');
        }
    }


    function formatTimestamp(timestamp) {
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var hours = ("0" + date.getHours()).slice(-2);
        var minutes = ("0" + date.getMinutes()).slice(-2);
        var seconds = ("0" + date.getSeconds()).slice(-2);

        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }

    const fetchBook=async (targetId)=>{
        console.log(targetId);
        const promises = targetId.map(innerIds => {
            return Promise.all(innerIds.map(iid => detail(iid)));
        });
        let allData = await Promise.all(promises);
        let flattenedData = allData.flatMap(innerArray => innerArray);
        console.log(flattenedData);
        setBook(flattenedData);
    }
    console.log(book)
    console.log(orders)
    const getBookbyId=(bookId)=>{
        return book.find((booki)=>booki.id===bookId);
    }
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
                }}>Order</b>
                <b style={{
                    fontSize: '2rem',
                    paddingLeft: '1%'
                }}>List</b>
                <Search onSearch={ (value) => setSearchitem(value)} style={{
                    width:'40%',
                    marginLeft:'8%',
                    marginTop:'0.64%'
                }}></Search>
                <RangePicker style={{
                    marginLeft:'5%',
                    marginTop:'0.23%'
                }} onChange={onDateChange} />
            </div>
            <Table dataSource={orders} style={{
                marginTop:'2%'
            }}  expandable={{
                expandedRowRender: (record) => (

                    <ul style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap'
                    }}>
                        {

                            record.orderItems.map((item)=> {
                                    const thisbook=getBookbyId(item.book_id);
                                    return(
                                        <Card>

                                            <li key={item.id} style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'top',
                                                // marginLeft: '30px',
                                                // marginTop: '20px',
                                                border: '1px, grey'
                                            }}>

                                                <Link to={`/book/${item.book_id}`} style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'top',
                                                    // marginLeft: '30px',
                                                    // marginTop: '20px',
                                                    border: '1px, grey'
                                                }}>


                                                    <img src={thisbook.imageUrl} alt={thisbook.title}
                                                         style={{width: '75px', height: '100px', marginRight: '20px'}}/>

                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'left'
                                                    }}>
                                                        <b style={{marginTop: '20px'}}>{thisbook.title}</b>
                                                        <b style={{marginTop: '15px'}}>数量： {item.amount}</b>
                                                    </div>
                                                </Link>
                                                <Button type="primary" style={{
                                                    position: 'absolute',
                                                    marginTop: '30px',
                                                    marginLeft: '80%'
                                                }}>Buy again</Button>
                                            </li>
                                        </Card>
                                    );

                                }
                            )
                        }
                    </ul>
                ),
                rowExpandable: (record) => record.name !== 'Not Expandable',
            }}>
                <Column title="购买人" dataIndex="buyer" key="buyer"/>
                <Column title="联系电话" dataIndex="phonenumber" key="phonenumber"/>
                <Column title="收货地址" dataIndex="address" key="address"/>
                <Column title="下单时间" dataIndex="time" key="time"  render={(time)=>{
                    return formatTimestamp(time)
                }}/>
            </Table>

        </div>
    );




}