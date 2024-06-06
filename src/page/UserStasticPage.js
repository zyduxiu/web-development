import React, { useState } from 'react';
import {
    ShoppingCartOutlined,
    BookOutlined,
    AccountBookOutlined,
    UserOutlined,
    BarChartOutlined, SecurityScanOutlined, PieChartOutlined
} from '@ant-design/icons';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import {SearchProps} from 'antd'
import Booklist from "../component/booklist";
import {useNavigate,Link} from "react-router-dom";
import "../css/home.css"
import Orderlist from "../component/orderlist";
//import {increment,decrement} from "./store/modules/counterstore";
import {Button} from "antd";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import OrdinaryStastics from "../component/OrdinaryStastics";
import UserStastics from "../component/UserStastic";
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

let username=localStorage.getItem('username');
export default function  UserStasticPage ({element}) {
    const navigate = useNavigate();
    function getItem(label, key, icon, path, children) {
        return {
            key,
            icon,
            label,
            onClick: () => {
                if (path) {
                    navigate(path);
                }
            },
            children,
        };
    }


    const items = [
        getItem('Books', '1', <BookOutlined />, '/home'),
        getItem('My cart', '2', <ShoppingCartOutlined />, '/cart'),
        getItem('My Orders', '3', <AccountBookOutlined />, '/order'),
        getItem('My Profile', '4', <UserOutlined />, '/profile'),
        getItem('Statistic', '10', <BarChartOutlined />, '/manage/statistic'),
        (localStorage.getItem("userType")==="ADMIN")&&getItem('Stastic Admin','6',<PieChartOutlined />,null,[
            getItem('Book Stastic','11',<PieChartOutlined />,'/stastic/book'),
            getItem('User Stastic','12',<BarChartOutlined />,'/stastic/user'),
        ]),
        (localStorage.getItem("userType")==="ADMIN")&&getItem('Management', '5', <SecurityScanOutlined />, '/manage', [
            getItem('Book Management', '7', null, '/manage/book'),
            getItem('User Management', '8', null, '/manage/register'),
            getItem('Order Management', '9', null, '/manage/order')
        ]),
    ];


    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['12']} mode="inline">
                    {items.map(item => (
                        // 如果当前菜单项有子菜单项，渲染 SubMenu，否则渲染普通的 Menu.Item
                        item.children ? (
                            <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
                                {item.children.map(subItem => (
                                    <Menu.Item key={subItem.key} icon={subItem.icon} onClick={subItem.onClick}>
                                        {subItem.label}
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        ) : (
                            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                                {item.label}
                            </Menu.Item>
                        )
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer
                    }}>
                    <Space size="customize">
                        <Link to='../home'>
                            <img src={require('../pic/store1.png')} style={{
                                position: 'absolute',
                                width: '120px',
                                height: '60px', marginTop: '-35px'

                            }}></img>
                        </Link>
                        <Link to='../profile'>
                            <Button shape="circle" icon={<UserOutlined/>} size="large"
                                    style={{
                                        position: 'absolute',
                                        marginLeft: '75%',
                                        marginTop: '-27px'
                                    }}
                            ></Button>
                        </Link>
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>{localStorage.getItem("userType")}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <UserStastics></UserStastics>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    my little web bookstore-designed by ant-design
                </Footer>
            </Layout>
        </Layout>
    );
};