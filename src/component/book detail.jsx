import React, { useEffect, useState } from 'react';
import buybook from "../services/buybook";
import Books from './books'
import {Space, Button, Form, Input, Modal,InputNumber,message} from "antd";
import {Link} from 'react-router-dom'
import Commentblock from "./commentblock";
// import {fetchBook} from "../page/book";
import detail from "../services/getbook";
import putcart from "../services/putcart";
// import fetch from 'unfetch'

import {HomeOutlined, PhoneOutlined, UserOutlined,CheckCircleOutlined} from "@ant-design/icons";
import postcart from "../services/postcart";
function BookDetail(targetId) {
    let username=localStorage.getItem('username');
    const [open2, setOpen2] = useState(false);
    const [form] = Form.useForm();
    const[form2]=Form.useForm();
    const [buyer,setBuyer]=useState(null);
    const [number,setNumber]=useState(null);
    const [address,setAddress]=useState(null);
    const [amount,setAmount]=useState(1);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmLoading2, setConfirmLoading2] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [book, setBook] = useState(null);
    const [instruction,setInstruction]=useState("");
    const [title,setTitle]=useState("");
    const [price,setPrice]=useState(0);
    const [author,setAuthor]=useState("");
    const [book_id,setBook_id]=useState(null);

    useEffect(() => {
        form.setFieldsValue({
            amount2: 1, // 设置 amount 字段的初始值为 10
        });
    }, []);
    const fetchBook=async ()=>{
        let data = await detail(targetId);
        setBook(data);
        setBook_id(data.id);
        console.log(data);
        setImageUrl(data.imageUrl);
    }
    useEffect(()=>{
        fetchBook();}, [targetId]);


    const showModal = () => {
        form.resetFields();
        setOpen(true);
    };
    const showModal2 = () => {
        form2.resetFields();
        setOpen2(true);
    };
    const handleBuyerchange=(e)=>{
        setBuyer(e.target.value);
    }
    const handleNumberchange=(e)=>{
        setNumber(e.target.value);
    }
    const handleAddresschange=(e)=>{
        setAddress(e.target.value);
    }
    let mookid=book_id;
    const information={
        buyer:buyer,
        phonenumber:number,
        amount:amount,
        address:address,
        book_id:mookid,
        username:username,
    }
    const cartitem={
        username:username,
        amount:amount,
        book_id:mookid
    }

    const handleOk2 = () => {
        // console.log(information);
        form2.validateFields().then(values=> {
            // console.log(information.book_id);
            // console.log(JSON.stringify(information));
            putcart(cartitem);
            message.success("已成功放入购物车");
            setConfirmLoading2(true);
            setTimeout(() => {
                setOpen2(false);
                setConfirmLoading2(false);
            }, 500);
        }).catch(errorInfo => {
            console.log('Validate Failed:', errorInfo);
        });
    };
    const handleOk = () => {
        console.log(information);
        form.validateFields().then(values=> {
            console.log(information.book_id);
            console.log(JSON.stringify(information));
            buybook(information);
            message.success("已成功下单");
            fetchBook();
            setConfirmLoading(true);
            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
            }, 500);
        }).catch(errorInfo => {
            console.log('Validate Failed:', errorInfo);
        });
    };
    const handleAmountchange=(value)=>{
        setAmount(value);
    }
    const handleCancel2 = () => {
        console.log('Clicked cancel button');
        setOpen2(false);
    };
    const phoneRegex = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const onfinish = (values) => {
        console.log('Success:', values);
    };
    const onfinish2 = (values) => {
        console.log('Success:', values);
    };

    console.log(book);
    // const book=Books()[pg]
    if (book != null) {
        console.log(book.price)
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img
                        src={book.imageUrl}
                        style={{
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
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <text style={{marginLeft: '60px', fontSize: '1.2rem', fontFamily: "楷体"}}>
                                库存:
                            </text>
                            <text style={{fontSize: '1.2rem', color: 'red', marginLeft: '5px'}}>{book.amount}</text>
                        </div>
                        <div>
                            <Button size='large' style={{
                                marginTop: '50px',
                            }}
                                    onClick={()=>showModal2()}
                            >加入购物车</Button>
                            <Modal
                                title="Submit your cart"
                                visible={open2}
                                onOk={()=>handleOk2()}
                                confirmLoading={confirmLoading2}
                                onCancel={()=>handleCancel2()}
                            >
                                <Form form={form2} name="basic" autoComplete="off" onFinish={()=>onfinish2()}>
                                    <Form.Item name="amount" label="amount" style={{padding:"3%"}} rules={[
                                        {
                                            required: true,
                                            type: 'number',
                                            min: 1,
                                            max: book.amount,
                                            message: '请输入合理的购买数量'
                                        },
                                    ]}>
                                        <InputNumber size="large" style={{

                                        }} onChange={handleAmountchange}  prefix={<CheckCircleOutlined />} />
                                    </Form.Item>
                                </Form>
                            </Modal>
                            <Button style={{marginLeft: '25px'}} onClick={()=>showModal()} size='large' type='primary'>在线购买</Button>
                            <Modal
                                title="Submit your order"
                                visible={open}
                                onOk={()=>handleOk()}
                                confirmLoading={confirmLoading}
                                onCancel={()=>handleCancel()}
                            >
                                <Form form={form} name="basic" autoComplete="off" onFinish={()=>onfinish()}>
                                    <Form.Item name="buyer" label="customer name"  style={{marginTop:'5%',padding:"3%"}} rules={[{ required: true, message: '请输入购买者姓名' }]}>
                                        <Input size="large" onChange={handleBuyerchange}  prefix={<UserOutlined/>}/>
                                    </Form.Item>
                                    <Form.Item name="phoneNumber" label="phone number" style={{padding:"3%"}} rules={[
                                        { required: true, message: '请输入手机号码' },
                                        {
                                            validator:
                                                async (_, value) => {
                                                if (phoneRegex.test(value)) {
                                                    return;
                                                }
                                                throw new Error('请输入有效的手机号码');
                                            },
                                        },
                                    ]}>
                                        <Input size="large" onChange={handleNumberchange} prefix={<PhoneOutlined/>}/>
                                    </Form.Item>
                                    <Form.Item name="amount" label="amount" style={{padding:"3%"}} rules={[
                                        {
                                            required: true,
                                            type: 'number',
                                            min: 1,
                                            max: book.amount,
                                            message: '请输入合理的购买数量'
                                        },
                                    ]}>
                                        <InputNumber size="large" value={form.getFieldValue('amount2')}   onChange={handleAmountchange}    prefix={<CheckCircleOutlined />} />
                                    </Form.Item>
                                    <Form.Item name="address" label="address" style={{padding:"3%"}} rules={[{ required: true, message: '请输入收货地址' }]}>
                                        <Input size="large"  onChange={handleAddresschange}   prefix={<HomeOutlined/>} />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </Space>
                </div>
                <div style={{
                    marginTop:'50px',
                    marginLeft:'-220px'
                }}>
                    <Commentblock/>
                </div>
            </div>

        );
    }else{
        return <div>loading...</div>;
    }
}

export default BookDetail;