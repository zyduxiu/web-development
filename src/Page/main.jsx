import React, { useState } from 'react';
import {
    UserOutlined,
    MoneyCollectOutlined,
    PlusCircleOutlined,
    StockOutlined,
    RedoOutlined
} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {Input, Space, List, Card, Table, Tag, Button, Modal, Form, Select, message, ConfigProvider} from 'antd';
import "../Css/home.css"
import Canlender from "../component/Calender";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Schedule from "../component/schedule";
import clients from "../data/Member";

import locale from 'antd/locale/zh_CN';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
export default function  Homepage () {
    const currentDate = new Date();
    const [clientList,setClientList]=useState(clients);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [date,setDate]=useState( extractDateOnly(currentDate));
    const navigate = useNavigate();
    let whetheradmin=localStorage.getItem("admin");
    const handleselect=(selectedDate)=>{
        const dateWithouttime=extractDateOnly(selectedDate);

        setDate(dateWithouttime);
    }
    const [form] = Form.useForm();
    const addNewClient = async (clientData) => {
        const existed = clients.some(client=>
            client.name === clientData.name ||
            client.phoneNumber === clientData.phoneNumber
        );
        if(existed){
            alert("客户已登记，无法重复添加客户");
            return;
        }
        try {
            const newClient = await saveClientData(clientData);
            setClientList(prevClient => [...prevClient, newClient]);
        }
        catch (error) {
            console.error("Failed to add patient", error);
        }
    };
    const saveClientData = async(clientData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        message.success("用户已成功添加");
        return{
            ...clientData,
            key: Date.now(),
            // 使用时间戳作为唯一键
            // 初始化任何其他必要的字段
            amount: '¥0.00',
            cards: [
                {
                    cardName:"无卡"
                }],
            visitRecords: [],
        };
    };
    function getItem(label, key, icon,path) {
        return {
            key,
            icon,
            label,
            onClick:()=>navigate(path)
        };
    }
    function extractDateOnly(dateTimeString) {
        const date = new Date(dateTimeString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1);
        const day = String(date.getDate()).padStart(2, '0');
        const dateOnlyString = `${year}/${month}/${day}`;

        return dateOnlyString;
    }
    const [mode,setMode]=useState(false)
    const items = [
        getItem('挂号', '1',<PlusCircleOutlined />,'/home'),
        getItem('收银', '3', <MoneyCollectOutlined />,'/cash'),
        getItem('客户', '4',  <UserOutlined />,'/profile'),
        (whetheradmin==="admin")&&getItem('统计', '2', <StockOutlined />,'/statistic'),
        (whetheradmin==="admin")&&getItem('设置','5',<UserOutlined />,'/settings'),
    ];
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await addNewClient(values);
            form.resetFields();
            setIsModalVisible(false);

        }

        catch(info){
            console.log('Validate Failed:', info);
            message.error({
                content: '更新失败，请重试！',
                duration: 3,
            })
        }
    };
    const [collapsed, setCollapsed] = useState(false);
    console.log(date);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    console.log(clientList);
    return(
        <Layout style={{minHeight: '100vh',}}>
            <Layout>
                <Header
                    style={{
                        position:'fixed',
                        width: '100%',
                        zIndex:100,
                        padding: 0,
                        background: colorBgContainer
                    }}>
                    <div className="demo-logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        items={items}
                        style={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    >{items.map(item => (
                        <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                            {item.label}
                        </Menu.Item>
                    ))}
                    </Menu>
                </Header>

                <div  style={{
                    marginTop:80, display:'flex',flexDirection:'row'
                }}>

                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'left',
                        marginLeft:'2%',
                        marginRight:'2%'
                    }}>
                        <ConfigProvider locale={locale}>
                            {<Canlender style={{
                                PaddingTop:'20%',
                            }} onDateSelect={handleselect}/>}
                            </ConfigProvider>
                        <div style={{
                            marginTop:'8%',
                        }}>

                            <Modal title="新建客户" visible={isModalVisible} onOk={(handleOk)} onCancel={handleCancel}>
                                <Form form={form} layout="vertical" onFinish={addNewClient}>
                                    <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入客户姓名' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="gender" label="性别" rules={[{ required: true, message: '请选择客户性别' }]}>
                                        <Select >
                                            <Select.Option value="男">男</Select.Option>
                                            <Select.Option value="女">女</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="phoneNumber" label="手机号码" rules={[{ required: true, message: '请输入客户手机号码' }]}>
                                        <Input
                                            type='number'
                                        />
                                    </Form.Item>

                                    <Form.Item name="age" label="年龄" rules={[{ required: true, message: '请输入客户年龄', min:0 }]}>
                                        <Input
                                            type='number'
                                        />
                                    </Form.Item>
                                </Form>
                            </Modal>

                        </div>
                    </div>


                    <Content

                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >

                            <div style={{
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'left'
                            }}>
                                <div style={{
                                    display:'flex',
                                    flexDirection:'row',
                                }}>

                                    {/*<Search*/}

                                    {/*    placeholder="搜索挂号单~"*/}
                                    {/*    allowClear*/}
                                    {/*    // onSearch={onSearch}*/}
                                    {/*    style={{*/}
                                    {/*        width: '30%',*/}
                                    {/*        border: '2px'*/}
                                    {/*    }}*/}
                                    {/*/>*/}

                                </div>
                                <Schedule style={{
                                    marginTop:'10%'
                                }} date2={date} clientlist={clientList} />
                            </div>
                        </div>
                    </Content>
                </div>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    by ant-design
                </Footer>
            </Layout>
        </Layout>
    );
};