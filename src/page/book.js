import {React,useState } from 'react';
import {
    ShoppingCartOutlined,
    BookOutlined,
    AccountBookOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import { AudioOutlined } from '@ant-design/icons';
import {Card, Input, Space} from 'antd';
import {SearchProps} from 'antd'
import Booklist from "../component/booklist";
import Books from "../component/books"
import "../css/home.css"
import BookDetail from "../component/book detail";
//import {increment,decrement} from "./store/modules/counterstore";
import {Button} from "antd";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
// import {Link} from 'react-router-dom'


export default function Bookpage(){
    const navigate = useNavigate();
    function getItem(label, key, icon,path) {
        return {
            key,
            icon,
            label,
            onClick: ()=>navigate(path),
        };
    }
    const items = [
        getItem('Books', '1', <BookOutlined />,'/home'),
        getItem('My cart', '2', <ShoppingCartOutlined/>,'/cart'),
        getItem('My Orders', '3', <AccountBookOutlined />,'/order'),
        getItem('My Profile', '4',  <UserOutlined />,'/profile'),
    ];
    let {id}=useParams();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
        return (
            <Layout
                style={{
                    minHeight: '100vh',
                    minWidth:'1000px'
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
                        {items.map(item => (
                            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer
                        }}>
                        {/*<Space size="customize">*/}
                            <Link to='../home'>
                                <img src={require('../pic/store1.png')} style={{
                                    position:'absolute',
                                    width:'120px',
                                    height:'60px',marginTop:'0px'

                                }}></img>
                            </Link>
                            <Button shape="circle" icon={<UserOutlined/>} size="large"
                                    style={{
                                        position: 'absolute',
                                        marginLeft: '75%',
                                        marginTop: '-27px'
                                    }}
                            ></Button>
                        {/*</Space>*/}
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
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>zhangyue</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            {BookDetail(id)}
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
