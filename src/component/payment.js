import React, { createContext, useContext, useState, useEffect} from 'react';
import {
    ShoppingCartOutlined,
    BookOutlined,
    AccountBookOutlined,
    UserOutlined,
    MoneyCollectOutlined,
    PlusCircleOutlined,
    StockOutlined
} from '@ant-design/icons';

import { Button, Modal, message ,Select} from 'antd';
import {DatePicker, List, Table, Tag, Descriptions, Typography, Tabs } from 'antd';
import {useNavigate} from "react-router-dom";
import { AudioOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Input, Space , Card} from 'antd';
import {SearchProps} from 'antd'
import { Avatar, Divider, Skeleton } from 'antd';
import "../Css/home.css";
import Canlender from "../component/Calender";
import { Breadcrumb, Layout, Menu, theme, Radio , Row, Col, AutoComplete} from 'antd';
import clients from "../data/Member";
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

export default function Payment(){
    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    const [isQRVisible, setIsQRVisible] = useState(false);

    const [payment, setPayment] = useState("");

    const [isMemberPaymentVisible, setIsMemberPaymentVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState([]);
    const [memberInfo, setMemberInfo] = useState({
        memberName: '',
        cardValue: 0,
        cardType: ''
    });

    const [selectedCustomer, setSelectedCustomer] = useState(clients[0]);

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
        console.log(`选择的支付方式是: ${payment}`); // 可以在这里处理支付逻辑
    }

    const handleConfirm = () => {
        if (selectedCustomer && memberInfo && selectedCustomer.amount) {
            const newBalance = parseFloat(memberInfo.cardValue) - parseFloat(selectedCustomer.amount.replace('¥', ''));
            setMemberInfo({
                ...memberInfo,
                cardValue: newBalance.toFixed(2) // 保持余额为两位小数
            });

            validatePhoneNumber(phoneNumber).then(data => {
                setMemberInfo(data); // 存储会员信息
                message.success(`会员名: ${data.memberName}, 余额: ${newBalance.toFixed(2)}`);

            }).catch(error => {
                message.error('电话号码不匹配或未找到会员信息。');
            });}

    };


    function validatePhoneNumber(phoneNumber) {
        return new Promise((resolve, reject) => {
            const member = clients.find(member => member.phoneNumber === phoneNumber);
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
    return(
        <div>
        <Button onClick={handlePaymentSubmission} id='charge' type="primary"  icon={<ShoppingCartOutlined />} style={{ marginRight: 8,  marginTop: 5}}>
            收费</Button>
        <Modal
    title="支付方式"
    visible={isPaymentModalVisible}
    onOk={handleConfirmPayment}
    onCancel={handleCloseModal}
    okText="确认"
    cancelText="取消"
>
    <select value={payment} style={{ width: 250, height: 30 }} onChange={selectPaymentMethod}>
        <option value="">请选择</option>
        <option value="微信支付">微信支付</option>
        <option value="支付宝">支付宝</option>
        <option value="美团支付">美团支付</option>
        <option value="Visa">Visa</option>
        <option value="Mastercard">Mastercard</option>
    </select>
    <p style={{ height: 30 }}>支付方式: {payment}</p>
</Modal>
<Modal
    title="确认支付"
    visible={isConfirmModalVisible}
    onCancel={handleCloseModal}
    footer={[
        <Button key="back" onClick={handleBackToPayment}>Back</Button>,
        <Button key="submit" type="primary" onClick={handleCloseModal}>Done</Button>,
    ]}
>
    <img src="../../QRCode.jpg" alt="Payment Confirmation" style={{ width: '100%' }} />
    <p>请确认支付信息 {selectedCustomer.amount}</p>
</Modal>
{selectedCustomer.status === '待收' && (
    <Button onClick={handleOpenMemberPayment} icon={<BookOutlined />}>会员卡扣费</Button>
)}
<Modal
    title="输入会员电话号码"
    visible={isMemberPaymentVisible}
    onOk={handleConfirm}
    onCancel={handleCloseModal}
    okText="确认"
    cancelText="取消"
>
    <Input
        placeholder="请输入电话号码"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
    />
    {memberInfo && (
        <Descriptions bordered style={{ marginTop: 12 }}>
            <Descriptions.Item label="会员名">{memberInfo.memberName}</Descriptions.Item>
            <Descriptions.Item span={3} label="余额">{`¥${memberInfo.cardValue}`}</Descriptions.Item>
            <Descriptions.Item label="卡类型">{memberInfo.cardType}</Descriptions.Item>
        </Descriptions>
    )}
</Modal>
        </div>
    )
}

