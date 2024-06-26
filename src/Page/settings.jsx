import React, { useState } from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";
import { Layout, Menu, Avatar, Divider, Skeleton, Button } from 'antd';
import { UserOutlined, TeamOutlined, MedicineBoxOutlined, ProjectOutlined, SettingOutlined, PlusCircleOutlined, MoneyCollectOutlined, StockOutlined } from '@ant-design/icons';
import { Doctors } from '../data/Doctor';
import '../Css/Profile.css';
import '../Css/home.css';
import '../Css/Doctor.css';
import dayjs from 'dayjs';
import {Outlet} from "react-router";

const { Header, Content, Footer, Sider } = Layout;

const Settingpage = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');

    const today = new Date();
    const dayOfWeek = today.getDay(); // 正确使用 getDay() 获取星期几

    const getItem = (label, key, icon, path) => ({
        key,
        icon,
        label,
        onClick: () => navigate(path)
    });

    const items = [
        getItem('挂号', '1', <PlusCircleOutlined />, '/home'),
        getItem('收银', '3', <MoneyCollectOutlined />, '/cash'),
        getItem('客户', '4', <UserOutlined />, '/profile'),
        getItem('统计', '2', <StockOutlined />, '/statistic'),
        getItem('设置', '5', <UserOutlined />, '/settings'),
    ];

    const location = useLocation();
    const getKeyFromPath = (path) => {
        switch (path) {
            case '/settings/accountDetail':
                return '1';
            case '/settings/accountManager':
                return '2';
            case '/settings/doctorSetting':
                return '3';
            case '/settings/treatmentSetting':
                return '4';
            default:
                return '5';
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ padding: 0}}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['5']} items={items}>
                    {items.map(item => (
                        <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Header>
            <Layout>
                <Sider>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['2']}
                        onSelect={({ key }) => setSelectedKey(key)}
                        selectedKeys={[getKeyFromPath(location.pathname)]}
                    >
                        {/*<Menu.Item key="1" icon={<UserOutlined />}><Link to={"/settings/accountDetail"}>我的账户</Link></Menu.Item>*/}
                        <Menu.Item key="2" icon={<TeamOutlined />}><Link to={"/settings/accountManager"}>成员管理</Link></Menu.Item>
                        <Menu.Item key="3" icon={<MedicineBoxOutlined />}><Link to={"/settings/doctorSetting"}>医生管理</Link></Menu.Item>
                        <Menu.Item key="4" icon={<ProjectOutlined />}><Link to={"/settings/treatmentSetting"}>项目管理</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Content  style={{ margin: '0 16px', display: 'flex', justifyContent: 'center',  paddingTop: '20px' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>...</Footer>
            </Layout>
        </Layout>
    );
};

export default Settingpage;
