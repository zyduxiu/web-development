import Dashboard from '../component/statisticChart/Dashboard';

 // import '../Css/test.css'

import React, { useState, useMemo } from 'react';
import { PlusCircleOutlined, MoneyCollectOutlined, UserOutlined, StockOutlined, BarChartOutlined, PieChartOutlined, LineChartOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Card, Breadcrumb, theme, } from 'antd';
import { BrowserRouter , Link, Routes, Route } from 'react-router-dom';

import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, BarElement, LinearScale, PointElement, ArcElement, LineElement } from 'chart.js';
import {Outlet} from "react-router";
Chart.register(CategoryScale, BarElement, LinearScale, PointElement, ArcElement, LineElement);





const { Header, Content, Footer, Sider } = Layout;

// 运营数据 新



export default function StatisticPage() {
    const navigate = useNavigate();

    // Navigation items with corresponding paths
    function getItem(label, key, icon, path) {
        return {
            key,
            icon,
            label,
            onClick: () => navigate(path)
        };
    }

    const items = [
        getItem('挂号', '1', <PlusCircleOutlined />, '/home'),
        getItem('收银', '3', <MoneyCollectOutlined />, '/cash'),
        getItem('客户', '4', <UserOutlined />, '/profile'),
        getItem('统计', '2', <StockOutlined />, '/statistic'),
        getItem('设置', '5', <UserOutlined />, '/settings'),
    ];

    

    const [selectedKey, setSelectedKey] = useState('1');
    const [collapsed, setCollapsed] = useState(false);

    // Theme tokens usage
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items}>
                        {items.map(item => (
                            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Header>
                <Layout>
                    <Sider>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Link to="/statistic/dashboard">营收概况</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/statistic/revenue">收费统计</Link>
                            </Menu.Item>
                            {/*<Menu.Item key="3">*/}
                            {/*    <Link to="/statistic/membership">营销分析</Link>*/}
                            {/*</Menu.Item>*/}
                            <Menu.Item key="4">
                                <Link to="/statistic/doctor-performance">业绩统计</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ margin: '24px 16px 0'}}>
                        <Outlet />
                    </Content>
                </Layout>
                {/*<Footer style={{ textAlign: 'center' }}>Ant Design ©2024 Created by Ant UED</Footer>*/}
            </Layout>
        </Layout>
    );
}