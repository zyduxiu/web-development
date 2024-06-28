import React, {useEffect} from 'react'

import {Button, Form, Input, InputNumber, Layout, message, Modal, Pagination, Space, Upload} from 'antd'
import '../css/booklist.css'
import {Card} from 'antd'
import {useState} from "react";
import {Link} from 'react-router-dom'
import Books from './books'
import getbooks from "../services/common";
import detail from "../services/getbook";
import {handlesearch} from "../services/handlesearch";
import {CheckCircleOutlined, HomeOutlined, PhoneOutlined, UserOutlined,LoadingOutlined,PlusOutlined,UploadOutlined} from "@ant-design/icons";
import putcart from "../services/putcart";
import alterInventory from "../services/alterInventory";
import deletecart from "../services/deletecart";
import TextArea from "antd/es/input/TextArea";
import addnewbook from "../services/addnewbook";
import deletebook from "../services/deleteBook";
export default function Bookmanagelist({searchitem}) {
    const [Books, setBooks] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmLoading2, setConfirmLoading2] = useState(false);
    const [form] = Form.useForm();
    const [amount,setAmount]=useState(-1);
    const [search, setSearch] = useState();
    const [open2, setOpen2] = useState(false);
    const[form2]=Form.useForm();
    const [instruction,setInstruction]=useState("");
    const [title,setTitle]=useState("");
    const [price,setPrice]=useState(-1);
    const [author,setAuthor]=useState("");
    const [curitem,setCuritem]=useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [ISBN,setISBN]=useState(null);

let cur={};
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    console.log(imageUrl);
    let trytitle="";
    useEffect(() => {
        setSearch(searchitem);
    }, [searchitem]);
    const handleDelete=(id)=>{
        console.log(id);
        delebook(id);
        message.success("书籍已成功删除/恢复上架")
    }

    useEffect(() => {
        fetchsearchBooks();
    }, [currentPage]);
    const delebook=async (id)=>{
        const boid={
            id:id,
        }
        console.log("hrere");
        let data=await deletebook(boid);
        fetchsearchBooks();
    }
    console.log(Books);
    const handleModal=(item)=>{
        setPrice(-1);
        setAmount(-1);
        setAuthor(null);
        setImageUrl(null);
        setTitle(null);
        setInstruction(null);
        setISBN(null);
        console.log(item);
        setCuritem(item);
    //    cur=item.title;
    //    setId(item.id);
   //     trytitle=item.title;
        setImageUrl(item.imageUrl);
        console.log(trytitle);
    //    setTitle(item.title);
        showModal();
    }
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // 获取Base64编码
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    const bookinf={
        title:title,
        author:author,
        amount:amount,
        price:price,
        imageUrl:imageUrl,
        instruction:instruction,
        isbn:ISBN,
    }
    const [id,setId]=useState(0);
    useEffect(() => {
        setCurrentPage(1);
        fetchsearchBooks2();
    }, [searchitem]);
    console.log(search);
    const showModal = () => {
        //Inventory.id=item.id;
      //  setTitle(curitem.title);
        form.resetFields();
      //  console.log(trytitle);

        setOpen(true);
    };
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    // const beforeUpload = (file) => {
    //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //     if (!isJpgOrPng) {
    //         message.error('You can only upload JPG/PNG file!');
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //         message.error('Image must smaller than 2MB!');
    //     }
    //     return isJpgOrPng && isLt2M;
    // };
    const showModal2 = () => {
        form2.resetFields();
        setOpen2(true);
    };

    const handleTitlechange=(e)=>{
        setTitle(e.target.value);
    }

    const handleAuthorchange=(e)=>{
        setAuthor(e.target.value);
    }

    const handlePricechange=(value)=>{
        setPrice(value);
    }

    const handleOk2 = () => {
        // console.log(information);
        form2.validateFields().then(values=> {
            try {
                console.log(bookinf);
                handleadd();
                // console.log(information.book_id);
                // // console.log(JSON.stringify(information));
                // putcart(cartitem);

            } catch(error){
                message.error("书籍已存在，请勿重复添加");
            }
            setImageUrl(null);
            setConfirmLoading2(true);
            setTimeout(() => {
                setOpen2(false);
                setConfirmLoading2(false);
            }, 500);
        }).catch(errorInfo => {
            console.log('Validate Failed:', errorInfo);
        });
    };

    const handleCancel2 = () => {
        setImageUrl(null);
        console.log('Clicked cancel button');
        setOpen2(false);
    };


    // const fetchBooks = async () => {
    //     console.log("im hrer")
    //     let lists = await getbooks(currentPage-1, pageSize);
    //     setPageCount(Math.ceil(lists.length / 10));
    //     setBooks(lists.content);
    //     console.log(lists.content.length)
    //     let x=lists.totalElements;
    //     console.log(x);
    //     console.log(pageSize)
    //     setPageCount(Math.ceil(x / pageSize));
    //     console.log(pageCount);
    // };
    //
    // console.log(pageCount);
    const Inventory={
        id:-1,
        amount:amount
    }


    const handlealter=async (Bookinf)=>{
        Inventory.id=id;
        console.log(Inventory.id);
        try {
            let data = await alterInventory(Bookinf);
            message.success("已成功修改书籍信息");
        }catch (error){
            message.error("书籍已存在，修改失败")
        }
        fetchsearchBooks();
    }

    const handleadd=async ()=>{
        try {
            let data = await addnewbook(bookinf);
            console.log(bookinf);
            message.success("已成功添加书籍");
        }catch(error){
            message.error("书籍已添加,请勿重复添加")
        }
        setCurrentPage(1);
        fetchsearchBooks2();
    }

    const props = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
                message.error(`${file.name} is not a png file`);
            }else{
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    // 转换成功后，将Base64编码存储在imageUrl状态变量中
                    setImageUrl(reader.result);
                };
                reader.onerror = () => {
                    // 转换失败时的处理
                    message.error('文件转换失败！');
                };
                return isPNG;
            }

        },
        onChange: (info) => {
            const { status } = info.file;
            console.log(info.fileList);
            if (status === 'removed') {
                setImageUrl(null);
            }
        },
    };

    console.log(pageCount);
    const handleOk = () => {
        const Bookinf={
            id:curitem.id,
            title:title,
            author:author,
            amount:amount,
            price:price,
            imageUrl:imageUrl,
            instruction:instruction,
            isbn:ISBN
        }
         console.log(Bookinf);
        form.validateFields().then(values=> {
            // console.log(information.book_id);
            // console.log(JSON.stringify(information));

            console.log(id);
            Inventory.id=id;
            console.log(Inventory.id);
            handlealter(Bookinf);
            setImageUrl(null);

            setConfirmLoading(true);
            setTimeout(() => {
                setOpen(false);
                setCuritem({});
                setConfirmLoading(false);
            }, 500);
        }).catch(errorInfo => {
          //  console.log('Validate Failed:', errorInfo);
            console.log(id);
            Inventory.id=id;
            console.log(Inventory.id);
            handlealter(Bookinf);
            setImageUrl(null);
            message.success("已成功修改书籍信息");
            setConfirmLoading(true);
            setTimeout(() => {
                setOpen(false);
                setCuritem({});
                setConfirmLoading(false);
            }, 500);
        });
    };

    const onfinish = (values) => {
        setCuritem(null);
        console.log('Success:', values);
    };

    const onfinish2 = (values) => {
        setImageUrl(null);
        console.log('Success:', values);
    };

    const fetchsearchBooks = async () => {
        console.log("im hrer")
        console.log(search);
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
        console.log(search);
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

    const onChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
    //    setCuritem(null);
        setImageUrl(null);
        setOpen(false);
    };

    const handleISBNchange=(e)=>{
        setISBN(e.target.value);
    }
    const handleInstructionchange=(e)=>{
        setInstruction(e.target.value);
    }

    const handleAmountchange=(value)=>{
        setAmount(value);
    }

    console.log(id);
    console.log(trytitle)
    if (Books) {
        return (
            <div>
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
                        }}>Book</b>
                        <b style={{
                            fontSize: '2rem',
                            paddingLeft: '1%'
                        }}>Management</b>
                        <div style={{
                            position: 'absolute',
                            marginLeft: '70%'
                        }}>
                            <Button type="primary" size="large" onClick={showModal2}>Add Book</Button>
                        </div>
                    </div>

                    <ul style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap'
                    }}>
                        {Books.map((item) => {
                               console.log(item)
                                return (

                                    <Card>
                                        <li key={item.id} style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'top',
                                            border: '1px, grey'
                                        }}>


                                            {!item.deleted && (
                                                <Link to={`/book/${item.id}`} style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'top',
                                                    border: '1px, grey'
                                                }}>
                                                    <img src={item.imageUrl} alt={item.title}
                                                         style={{width: '75px', height: '100px', marginRight: '20px'}}/>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'left'
                                                    }}>
                                                        <b style={{marginTop: '20px'}}>{item.title}</b>
                                                        <b style={{marginTop: '15px'}}>库存： {item.amount}</b>
                                                    </div>
                                                </Link>
                                            )}
                                            {item.deleted && (
                                                <div style={{display:'flex',flexDirection:'row'}}>
                                                <div style={{position: 'relative', width: '75px', height: '100px'}}>
                                                    <img src={item.imageUrl} alt={item.title}
                                                         style={{width: '75px', height: '100px', marginRight: '20px'}}/>
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
                                                        fontSize: '14px', // Adjusted font size for better visibility
                                                        color: 'red',
                                                        fontWeight: 'bold',
                                                    }}>
                                                        书籍已下架
                                                    </div>
                                                </div>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'left'
                                                    }}>
                                                        <b style={{marginTop: '20px',marginLeft:'20px'}}>{item.title}</b>
                                                        <b style={{marginTop: '15px',marginLeft:'20px'}}>库存： 已下架</b>
                                                    </div>
                                                </div>
                                            )}
                                            {/*<Link to={`/book/${item.id}`} style={{*/}
                                            {/*    display: 'flex',*/}
                                            {/*    flexDirection: 'row',*/}
                                            {/*    alignItems: 'top',*/}
                                            {/*    border: '1px, grey'*/}
                                            {/*}}>*/}
                                            {/*    <img src={item.imageUrl} alt={item.title}*/}
                                            {/*         style={{width: '75px', height: '100px', marginRight: '20px'}}/>*/}
                                            {/*    <div style={{*/}
                                            {/*        display: 'flex',*/}
                                            {/*        flexDirection: 'column',*/}
                                            {/*        alignItems: 'left'*/}
                                            {/*    }}>*/}
                                            {/*        <b style={{marginTop: '20px'}}>{item.title}</b>*/}
                                            {/*        <b style={{marginTop: '15px'}}>库存： {item.amount}</b>*/}
                                            {/*    </div>*/}
                                            {/*</Link>*/}



                                            <Button onClick={() => handleModal(item)} type="default" style={{
                                                position: 'absolute',
                                                marginTop: '10px',
                                                marginLeft: '80%',
                                                width: '10%'
                                            }}>Change inventory</Button>
                                            {(!item.deleted)&&
                                            <Button type="primary" onClick={() => handleDelete(item.id)} style={{
                                                position: 'absolute',
                                                marginTop: '60px',
                                                marginLeft: '80%',
                                                width: '10%'
                                            }}>Delete book</Button>
                                            }
                                            {(item.deleted)&&
                                                <Button onClick={() => handleDelete(item.id)} style={{
                                                    position: 'absolute',
                                                    marginTop: '60px',
                                                    marginLeft: '80%',
                                                    width: '10%'
                                                }}>Recover book</Button>
                                            }
                                        </li>
                                    </Card>

                                );
                            }
                        )}
                    </ul>
                    <div style={{
                        marginLeft: '40%', marginTop: '40px'
                    }}>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={pageCount*pageSize}
                            onChange={onChange}
                        />
                    </div>
                    <Modal
                        title="Alter book information"
                        visible={open}
                        onOk={() => handleOk()}
                        confirmLoading={confirmLoading}
                        onCancel={() => handleCancel()}
                        forceRender={true}
                    >
                        <Form form={form} name="basic" autoComplete="off" onFinish={() => onfinish()}>
                            <div style={{
                                display: 'flex', flexDirection: 'row'
                            }}>
                                <Form.Item name="title" label="title" style={{padding: "3%", width: '50%'}} rules={[{
                                    //  required: true,
                                    message: '请输入新增书本名称'
                                }]}>
                                    <Input size="large" defaultValue={curitem.title} style={{}}
                                           onChange={handleTitlechange}
                                           prefix={<CheckCircleOutlined/>}
                                           readOnly ={curitem.deleted}/>
                                </Form.Item>
                                <Form.Item name="author" label="author" style={{padding: "3%", width: '50%'}} rules={[{
                                    //required: true,
                                    message: '请输入新增书本作者名称'
                                }]}>
                                    <Input size="large" style={{}} defaultValue={curitem.author}
                                           onChange={handleAuthorchange}
                                           prefix={<CheckCircleOutlined/>}
                                           readOnly ={curitem.deleted}/>
                                </Form.Item>
                            </div>
                            <div style={{
                                display: 'flex', flexDirection: 'row'
                            }}>
                                <Form.Item name="amount" label="amount" style={{width: '50%'}} rules={[{
                                    //required: true,
                                    type: 'number',
                                    min: 1,
                                    message: '请输入书本库存数量'
                                }]}>
                                    <InputNumber size="large" style={{}} defaultValue={!curitem.deleted ? curitem.amount : "已下架"}
                                                 initialValue={curitem.amount} onChange={handleAmountchange}
                                                 prefix={<CheckCircleOutlined/>}
                                                 readOnly ={curitem.deleted}/>
                                </Form.Item>
                                <Form.Item name="price" label="cent" style={{width: '50%'}} rules={[{
                                    //   required: true,
                                    type: 'number',
                                    min: 0,
                                    message: '请输入书本价格'
                                }]}>
                                    <InputNumber size="large" style={{}}
                                                 defaultValue={!curitem.deleted ? curitem.price : "已下架"}
                                                 onChange={handlePricechange}
                                                 prefix={<CheckCircleOutlined/>}
                                                 readOnly ={curitem.deleted}
                                    />
                                </Form.Item>
                            </div>
                            <div style={{
                                display: 'flex', flexDirection: 'row'
                            }}>
                                <div style={{
                                    display:'flex',flexDirection:'column'
                                }}>
                                        <Form.Item name="ISBN" label="ISBN" style={{padding: "3%", width: '50%'}} rules={[{
                                            //required: true,
                                            message: '请输入新增ISBN'
                                        }]}>
                                            <Input size="large" style={{}} defaultValue={curitem.isbn}
                                                   onChange={handleISBNchange}
                                                   prefix={<CheckCircleOutlined/>}
                                                   readOnly ={curitem.deleted}/>
                                        </Form.Item>
                                    <Form.Item name="image" label="image" style={{width: '50%'}} rules={[{
                                        //  required: true,
                                        message: '请上传书本照片'
                                    }]}>
                                        <Upload listType="picture-card"
                                                defaultFileList={curitem.imageUrl ? [{url: curitem.imageUrl}] : []}
                                                {...props}
                                            disabled ={curitem.deleted}
                                        >
                                            {!imageUrl && (
                                                <button
                                                    style={{
                                                        border: 0,
                                                        background: 'none',
                                                    }}
                                                    type="button"
                                                >
                                                    <PlusOutlined/>
                                                    <div
                                                        style={{
                                                            marginTop: 8,
                                                        }}
                                                    >
                                                        Upload
                                                    </div>
                                                </button>
                                            )}
                                        </Upload></Form.Item>
                                </div>
                                <Form.Item name="" label="" rules={[{
                                    // required: true,
                                    message: '请上传书本简介'
                                }]}>
                                    <TextArea rows={6} size="large" defaultValue={curitem.instruction}
                                              style={{marginLeft: '10px'}}
                                              onChange={handleInstructionchange}
                                              prefix={<CheckCircleOutlined/>}
                                              readOnly ={curitem.deleted}
                                    />
                                </Form.Item>
                            </div>
                        </Form>
                    </Modal>

                    <Modal
                        title="Add Book"
                        visible={open2}
                        onOk={() => handleOk2()}
                        confirmLoading={confirmLoading2}
                        onCancel={() => handleCancel2()}
                    >

                        <Form form={form2} name="basic" autoComplete="off" onFinish={() => onfinish2()}>
                            <div style={{
                                display: 'flex', flexDirection: 'row'
                            }}>
                                <Form.Item name="title" label="title" style={{padding: "3%", width: '50%'}} rules={[{
                                    required: true,
                                    message: '请输入新增书本名称'
                                }]}>
                                    <Input size="large" style={{}} onChange={handleTitlechange}
                                           prefix={<CheckCircleOutlined/>}/>
                                </Form.Item>
                                <Form.Item name="author" label="author" style={{padding: "3%", width: '50%'}} rules={[{
                                    required: true,
                                    message: '请输入新增书本作者名称'
                                }]}>
                                    <Input size="large" style={{}} onChange={handleAuthorchange}
                                           prefix={<CheckCircleOutlined/>}/>
                                </Form.Item>
                            </div>
                            <div style={{
                                display: 'flex', flexDirection: 'row'
                            }}>
                                <Form.Item name="amount" label="amount" style={{width: '50%'}} rules={[{
                                    required: true,
                                    type: 'number',
                                    min: 1,
                                    message: '请输入书本库存数量'
                                }]}>
                                    <InputNumber size="large" style={{}} onChange={handleAmountchange}
                                                 prefix={<CheckCircleOutlined/>}/>
                                </Form.Item>
                                <Form.Item name="price" label="cent" style={{width: '50%'}} rules={[{
                                    required: true,
                                    type: 'number',
                                    min: 1,
                                    message: '请输入书本价格'
                                }]}>
                                    <InputNumber size="large" style={{}} onChange={handlePricechange}
                                                 prefix={<CheckCircleOutlined/>}/>
                                </Form.Item>
                            </div>
                            <div style={{
                                display: 'flex', flexDirection: 'row'
                            }}>
                                <div style={{
                                    display:'flex',flexDirection:'column'
                                }}>
                                    <Form.Item name="ISBN" label="ISBN" style={{padding: "3%", width: '50%'}} rules={[{
                                        required: true,
                                        message: '请输入ISBN'
                                    }]}>
                                        <Input size="large" style={{}}
                                               onChange={handleISBNchange}
                                               prefix={<CheckCircleOutlined/>}
                                               />
                                    </Form.Item>
                                <Form.Item name="image" label="image" style={{width: '50%'}} rules={[{
                                    required: true,
                                    message: '请上传书本照片'
                                }]}>
                                    <Upload listType="picture-card" {...props}>
                                        {!imageUrl && (
                                            <button
                                                style={{
                                                    border: 0,
                                                    background: 'none',
                                                }}
                                                type="button"
                                            >
                                                <PlusOutlined/>
                                                <div
                                                    style={{
                                                        marginTop: 8,
                                                    }}
                                                >
                                                    Upload
                                                </div>
                                            </button>
                                        )}
                                    </Upload>
                                </Form.Item>
                                </div>
                                <Form.Item name="" label="" rules={[{
                                    required: true,
                                    message: '请上传书本简介'
                                }]}>
                                    <TextArea rows={6} size="large" style={{marginLeft: '10px'}}
                                              onChange={handleInstructionchange}
                                              prefix={<CheckCircleOutlined/>}/>
                                </Form.Item>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}