import React, { useState } from 'react';
import {
    ShoppingCartOutlined,
    BookOutlined,
    AccountBookOutlined,
    UserOutlined,
    MoneyCollectOutlined,
    PlusCircleOutlined,
    StockOutlined
} from '@ant-design/icons';

import { Button, Modal, message } from 'antd'; 
import {DatePicker, List, Table, Tag, Descriptions, Typography, Tabs } from 'antd';
import {patients} from '../data/Patients';
import {useNavigate} from "react-router-dom";
import { AudioOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Input, Space , Card} from 'antd';
import {SearchProps} from 'antd'
import { Avatar, Divider, Skeleton } from 'antd';
import "../Css/home.css";
import Canlender from "../component/Calender";
import { Breadcrumb, Layout, Menu, theme, Radio , Row, Col, AutoComplete} from 'antd';
import CheckPay from '../component/CheckPay';
import PayFromMemberCard from '../component/PayFromMemberCard';
const { Header, Content } = Layout;
const { Search } = Input;

let whetheradmin=localStorage.getItem("admin");
export default function Cashpage () {

    const search_bar_autocomplete_val = patients.map((item)=>item.name);

    const columns = [
        {
            title: '姓名',
            width: 70,
            dataIndex: 'name',
            key: 'name',
        },
    ];

    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    const [isQRVisible, setIsQRVisible] = useState(false);

    const [payment, setPayment] = useState("");

    const [isMemberPaymentVisible, setIsMemberPaymentVisible] = useState(false);
    const [memberPhone, setMemberPhone] = useState([]);
    const [memberInfo, setMemberInfo] = useState({
        memberName: '',
        cardBalance: 0,
        cardType: ''
    });

    const [selectedCustomer, setSelectedCustomer] = useState(patients[0]);

    function selectPaymentMethod(e) {
        setPayment(e.target.value);
    }

    function handlePaymentSubmission() {
        setIsPaymentModalVisible(true);
        // Here you can add logic to actually process the payment
    }

    function handleConfirmPayment() {
        if (!payment) {
            alert("请先选择一个支付方式！");
            return;
        }
        selectedCustomer.status = '已收';
        setIsPaymentModalVisible(false);
        setIsConfirmModalVisible(true);
        setPayment("");
    }

    const handleOpenMemberPayment = () => {
        setIsMemberPaymentVisible(true);
    }

    function handleBackToPayment() {
        setIsConfirmModalVisible(false);  // 关闭确认支付模态窗口
        setIsPaymentModalVisible(true);   // 重新打开选择支付方式的模态窗口
    }

    function handleCloseModal () {
        setIsPaymentModalVisible(false);
        setIsConfirmModalVisible(false);
        setIsMemberPaymentVisible(false);
        setPayment("");
        // selectedCustomer.status = '已收';
        // return message.success('支付成功！'); 
    }

    function handleDonePayment () {
        setIsPaymentModalVisible(false);
        setIsConfirmModalVisible(false);
        setIsMemberPaymentVisible(false);
        setPayment("");
        selectedCustomer.status = '已收';
        return message.success('支付成功！');
    }

    const handleConfirm = () => {
        setIsPaymentModalVisible(false);
        setIsConfirmModalVisible(false);
        setIsMemberPaymentVisible(false);
        setPayment("");
        selectedCustomer.status = '已收';

        if (selectedCustomer && memberInfo && selectedCustomer.amount) {
            if(memberInfo.cardBalance < selectedCustomer.amount) {
                message.error('余额不足，支付失败!');
                return;
            }

            const newBalance = parseFloat(memberInfo.cardBalance) - parseFloat(selectedCustomer.amount.replace('¥', ''));
            setMemberInfo({
              ...memberInfo,
              cardValue: newBalance.toFixed(2) // 保持余额为两位小数
              
            });

        validatePhoneNumber(memberPhone).then(data => {
          setMemberInfo(data); // 存储会员信息
        //   message.success(`会员名: ${data.memberName}, 余额: ${newBalance.toFixed(2)}`);
          message.success('支付成功！');

        }).catch(error => {
          message.error('电话号码不匹配或未找到会员信息。');
        });
        }
        else{
            message.error("交易失败！");
        }

      };
      

      function validatePhoneNumber(memberPhone) {
        return new Promise((resolve, reject) => {
            const member = patients.find(member => member.memberPhone === memberPhone);
            if (member) {
                resolve({ 
                    memberName: member.name, 
                    cardValue: member.cardValue,  // 确保这里使用的是cardValue，而不是balance
                    cardType: member.cardType
                });
            } else {
                reject('未找到对应会员或电话号码错误。');
            }
        });
    }

    const sidebar_options = [
        {
            label:'全部',
            value:'全部',
        },
        {
            label:'未收',
            value:'未收',
        },
    ]

    const [sidebar_select_value,set_sidebar_select_value] = useState('全部');
    const onChange_sidebar_select = ({target:{value}}) => {
        set_sidebar_select_value(value);
    }

    const filteredRows = patients.filter((row) => {
        if (sidebar_select_value === '全部') {
            return true;
        } else if (sidebar_select_value === '未收') {
            return row.status !=='已收';
        }
    });

    const onSelectCustomer = (record) => {
        setSelectedCustomer(record);

    };

    const navigate=useNavigate()
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
        getItem('统计', '2', <StockOutlined />,'/statistic'),
        getItem('设置','5',<UserOutlined />,'/settings'),
    ];
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const {RangePicker} = DatePicker;

    return (

        <Layout style={{ minHeight: '100vh' }}>

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
                        defaultSelectedKeys={['3']}
                        items={items}
                        style={{
                            flex: 1,
                            minWidth: 0,
                            cursor: 'pointer'
                        }}
                    >
                        {items.map(item => (
                            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Header>

                <Layout>
                    
                    <CheckPay />
                    {/* <PayFromMemberCard /> */}
                </Layout>
                {/* <Footer style={{ textAlign: 'center' }}>...</Footer> */}

        </Layout>
            );
};