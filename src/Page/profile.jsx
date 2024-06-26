import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {MemberCard, useMember} from '../component/MemberCard';
import ClientInfo from '../component/ClientInfo';
import '../Css/Profile.css';
import {
    ShoppingCartOutlined,
    BookOutlined,
    AccountBookOutlined,
    UserOutlined,
    MoneyCollectOutlined,
    PlusCircleOutlined,
    StockOutlined,
    EditOutlined,
    CreditCardOutlined,
} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import '../Css/Profile.css';
import { AudioOutlined } from '@ant-design/icons';
import {Modal, Button, Input, Space, List, Card, Table, Tag, DatePicker, Radio, Col, Form, Select} from 'antd';
import {SearchProps} from 'antd'
import { Avatar, Divider, Skeleton } from 'antd';
import "../Css/home.css"
import Canlender from "../component/Calender";
//import {increment,decrement} from "./store/modules/counterstore";
import { Breadcrumb, Layout, Menu, theme, Descriptions } from 'antd';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';


const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;


export default function  Profilepage () {

    const navigate=useNavigate()
    let whetheradmin=localStorage.getItem("admin");
    function getItem(label, key, icon,path) {
        return {
            key,
            icon,
            label,
            onClick: ()=>navigate(path)
        };
    }

    const items = [
        getItem('挂号', '1',<PlusCircleOutlined />,'/home'),
        getItem('收银', '3', <MoneyCollectOutlined />,'/cash'),
        getItem('客户', '4',  <UserOutlined />,'/profile'),
        (whetheradmin==="admin")&&getItem('统计', '2', <StockOutlined />,'/statistic'),
        (whetheradmin==="admin")&&getItem('设置','5',<UserOutlined />,'/settings'),
    ];

    return (

        <Layout style={{ minHeight: '100vh' }}>
            <Header className='fixed-header' style={{ padding: 0, background: 'colorBgContainer', zIndex:100}}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['4']}
                    items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    {items.map((item) => (
                        <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Header>

            <Layout>
                <ClientInfo />
            </Layout>
            
            <Footer style={{textAlign: 'center'}}>...</Footer>
        </Layout>
    );
};