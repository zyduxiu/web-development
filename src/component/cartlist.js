import React, {useEffect, useState} from 'react'
import {Table,Button,Input,Modal,Form,message} from 'antd'
import Carts from "./Carts";
import {Link} from 'react-router-dom'
import '../css/button.css'
import getbooks from "../services/common";
import getcart from "../services/getcart";
import detail from "../services/getbook";
import postcart from "../services/postcart";
import {PhoneOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";
import deletecart from "../services/deletecart";
const { Search } = Input;
const { Column, ColumnGroup } = Table;

export default function Cartlist(){
    let username=localStorage.getItem('username');
    const [form] = Form.useForm();
    const [carts, setCarts] = useState(null);
    const [book, setBook] = useState(null);
    const [buyer,setBuyer]=useState(null);
    const [number,setNumber]=useState(null);
    const [address,setAddress]=useState(null);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    useEffect(() => {
    }, [open]);
    useEffect(()=>{

    },[username]);
    const showModal = () => {
        form.resetFields();
        setOpen(true);
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


    const information={
        buyer:buyer,
        phonenumber:number,
        address:address,
        carts:carts,
        username:username,
    }
    const phoneRegex = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    const handleOk = () => {
        console.log(information);
        form.validateFields().then(values=> {
            console.log(JSON.stringify(information));
            try {
                postcart(information)
                    .then(data => {
                        console.log(data);
                        message.success('已成功下单');
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 400) {
                            message.error("无法下单，库存不足");
                        } else {
                            message.error("无法下单,库存不足");
                        }
                        console.error('Error:', error);
                    });
            } catch (error) {
                // 这里处理try块中代码的直接异常
                console.error('Error in try block:', error);
                message.error("错误");
            }
            //message.success('已成功下单');
            setConfirmLoading(true);
            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
                fetchCarts();
            }, 500);
        }).catch(errorInfo => {
            console.log('Validate Failed:', errorInfo);
        });
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const fetchCarts=async ()=>{
        let lists = await getcart(username);
        setCarts(lists);
        console.log(lists);
        const bookIds=lists.cartItems.map(item=>item.bookid);
        console.log(bookIds);
        fetchBook(bookIds);
        // setImageUrl(lists.imageUrl);
    }

    const deleteinformation={
        username:username,
        book_id:0
    }
    const handledelete=async (pd)=>{
        deleteinformation.book_id=pd;
        let data=await deletecart(deleteinformation);
        fetchCarts();
        message.success('购物车项已成功删除');
    }
    useEffect(()=>{
        fetchCarts();},[username]);

    const fetchBook=async (targetId)=>{
        console.log(targetId);
        let data = await Promise.all(targetId.map(id=>detail(id)));
        console.log(data);
        setBook(data);
    }
    const onfinish = (values) => {
        console.log('Success:', values);
    };
    console.log(book)
    console.log(carts)
    if(carts!==null) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
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
                {/*<Search size='large' style={{*/}
                {/*    marginTop: '2%',*/}
                {/*    height: '10%',*/}
                {/*    width: '70%',*/}
                {/*    marginLeft: '5%'*/}
                {/*}}>*/}
                {/*</Search>*/}
                <Table dataSource={book} style={{
                    marginTop: '2%'
                }}>
                    <ColumnGroup title="Name">
                        <Column title="Cover" dataIndex="cover" key="cover" render={(cover, record) => (
                            <>
                                <Link to={`/book/${record.id}`}>
                                    <img src={record.imageUrl} alt="图片" style={{width: '100px', height: '120px'}}/>
                                </Link>
                            </>
                        )}/>
                        <Column title="Title" dataIndex="title" key="title"/>
                    </ColumnGroup>
                    <Column title="Amount" dataIndex="amount" key="amount" render={(id,record)=>{
                        console.log(record);
                        let amount=0;
                        carts.cartItems.map(cart=>{
                            if(cart.bookid === record.id) {
                                amount=cart.amount;
                            }
                        })
                        return amount;
                    }}/>
                    <Column title="Price" dataIndex="price" key="price"/>
                    <Column title="Action" dataIndex="action" key="action" render={(id,record) => {
                        console.log(record.id);
                        return(
                            <>
                                <Button type="primary" onClick={()=>handledelete(record.id)}>Delete</Button>
                            </>
                        )
                    }}/>
                </Table>

                <Button className="btn2" onClick={()=>showModal()} style={{
                    width: '100%',
                    paddingBottom: '30px'
                }}>Buy Now!
                </Button>
                <Modal
                    title="Submit your order"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <Form form={form} name="basic" autoComplete="off" onFinish={onfinish}>
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
                        <Form.Item name="address" label="address" style={{padding:"3%"}} rules={[{ required: true, message: '请输入收货地址' }]}>
                            <Input size="large"  onChange={handleAddresschange}   prefix={<HomeOutlined/>} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}