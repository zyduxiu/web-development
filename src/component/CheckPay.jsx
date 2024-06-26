import React, { useState, useEffect } from 'react';

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
import { Layout, Space, Radio } from 'antd';
import {DatePicker, List, Table, Tag, Descriptions, Typography, Tabs } from 'antd';
import { Breadcrumb, Menu, theme, Row, Col, AutoComplete} from 'antd';
import PayFromMemberCard from './PayFromMemberCard';
import '../Css/CheckPay.css';

const { Sider, Content } = Layout;

function CheckPay() {
    const sidebar_options = [
        { label: '全部', value: '全部' },
        { label: '未收', value: '未收' },
    ];

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [sidebar_select_value, set_sidebar_select_value] = useState('全部');
    const [patients, setPatients] = useState([]);
    const [payment, setPayment] = useState('');

    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(patients[0]);
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/paid',{credentials: "include",})
            .then(response => {
                console.log("Response status:", response.status);  // 打印响应状态码
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();  // 先读取为文本
            })
            .then(text => {
                console.log('Received response:', text);  // 输出接收到的文本内容
                return text ? JSON.parse(text) : [];  // 确保即使是空字符串也能正确处理
            })
            .then(data => {
                console.log('Parsed data:', data);
                setPatients(data);
                setFilteredRows(data);
            })
            .catch(error => {
                console.error('Error fetching unpaid appointments:', error);
            });
    }, []);

    console.log(patients);
    const onChange_sidebar_select = ({ target: { value } }) => {
        set_sidebar_select_value(value);
        if (value === '全部') {
            setFilteredRows(patients);
        } else if (value === '未收') {
            setFilteredRows(patients.filter(row => row.attribute === '已诊'));
        }
    };

    const columns = [
        {
            title: '姓名',
            width: 70,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '项目',
            width: 55,
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '医生',
            dataIndex: 'doctor',
            key: 'amount',
        },
    ];
    console.log(selectedCustomer);

    const onSelectCustomer = (record) => {
        setSelectedCustomer(record);
    };

    
    function selectPaymentMethod(e) {
        setPayment(e.target.value);
    }

    function handlePaymentSubmission() {
        setIsPaymentModalVisible(true);
    }

    function handleConfirmPayment() {
        if (!payment) {
            alert("请先选择一个支付方式！");
            return;
        }
        selectedCustomer.status = '已付费';
        setIsPaymentModalVisible(false);
        setIsConfirmModalVisible(true);
        setPayment("");
    }

    function handleBackToPayment() {
        setIsConfirmModalVisible(false);  // 关闭确认支付模态窗口
        setIsPaymentModalVisible(true);   // 重新打开选择支付方式的模态窗口
    }

    function handleDonePayment () {
        setIsPaymentModalVisible(false);
        setIsConfirmModalVisible(false);
        setPayment("");
        selectedCustomer.status = '已付费';
        return message.success('支付成功！');
    }

    function handleCloseModal () {
        setIsPaymentModalVisible(false);
        setIsConfirmModalVisible(false);
        setPayment("");
    }


    return (
        <div className='main-container'>
        <div className='split-into-left-right'>
                <div className='left-section-sidebar'>
            <Sider width={300} style={{ zIndex: 80, marginTop: 60, background: 'whitesmoke' }} className="site-layout-background margin-from-top">
                <Space direction={"vertical"} size={8}>
                    <DatePicker.RangePicker style={{ marginTop: 10, marginLeft: 15 }} />
                    <Radio.Group
                        style={{ marginLeft: 15 }}
                        options={sidebar_options}
                        onChange={onChange_sidebar_select}
                        value={sidebar_select_value}
                        optionType="button"
                        size={'large'}
                    />
                    <div style={{ width: 295, cursor: 'pointer' }}>
                        <Table
                            style={{ marginLeft: 15 }}
                            columns={columns}
                            dataSource={filteredRows}
                            size={'small'}
                            onRow={(record) => {
                                return {
                                    onClick: () => onSelectCustomer(record), // click row
                                };
                            }}
                        />
                    </div>
                </Space>
            </Sider>
            </div>

            <div className='right-section-payment'>

            <Content className='right-section-payment' style={{ margin: '0 16px' }}>
            {/* Header with Charge Information and Buttons */}
            {selectedCustomer && (
                <div style={{ padding: 24, marginTop: 80, background: colorBgContainer, borderRadius: borderRadiusLG, marginBottom: 24 }}>
                    <Row  gutter={16} justify="space-between" align="middle">
                        <Col>
                            <Typography.Title level={4}>收费详情</Typography.Title>
                        </Col>
                        <Col>
                            <Descriptions size="small" column={3}>
                                <Descriptions.Item label="收费金额">{selectedCustomer.appointmentcost}</Descriptions.Item>
                                <Descriptions.Item label="就诊日期">{selectedCustomer.date}</Descriptions.Item>
                            </Descriptions>

                            {selectedCustomer.status !== '已付费' && (
                            <Button  className='button-pay' onClick={handlePaymentSubmission} id='charge' type="primary"  icon={<ShoppingCartOutlined />} style={{ marginRight: 8,  marginTop: 5}}>
                                收费
                            </Button>
                        )} 
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
                                    <Button key="submit" type="primary" onClick={handleDonePayment}>Done</Button>,
                                ]}
                            >
                                <img src="../../QRCode.jpg" alt="Payment Confirmation" style={{ width: '100%' }} />
                                <p>请确认支付信息 {selectedCustomer.amount}</p>
                            </Modal>

                            <PayFromMemberCard currentAppointment={selectedCustomer}/>

                        </Col>
                    </Row>
                </div>
            )}

            {/* Content with Patient Information, Charge Items Table and Membership Details */}
            <div style={{ padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG }}>
                {/* Patient Details and Responsible Doctor */}
                {selectedCustomer && (
                    <Descriptions title="客户信息"  style={{ marginBottom: 2 }} column={5}>
                        <Descriptions.Item label="姓名">{selectedCustomer.name}</Descriptions.Item>
                        <Descriptions.Item label="会员等级">{selectedCustomer.membership}</Descriptions.Item>
                        <Descriptions.Item label="问诊日期">{selectedCustomer.date}</Descriptions.Item> 
                        <Descriptions.Item label="负责医生" span={3}>{selectedCustomer.doctor}</Descriptions.Item> 
                    </Descriptions>
                )}

                {selectedCustomer && (
                <Descriptions title="收费一览"  style={{ marginBottom: 2 }}></Descriptions>
                )}
                {/* Charge Items Table */}
                {selectedCustomer && (

                    <Table
                        columns={[
                            { title: '项目名称', dataIndex: 'type', key: 'type' },
                            { title: '单价', dataIndex: 'price', key: 'appointmentcost' },
                            { title: '折扣', dataIndex: 'cardDiscount', key: 'cardDiscount', render: (text) => text || '无' },
                            { title: '金额', dataIndex: 'amount', key: 'amount' },
                        ]}
                        dataSource={selectedCustomer.chargeItems}
                        pagination={false}
                        style={{ marginBottom: 24 }}
                    />
                )}

                {/* Membership Details */}
                {selectedCustomer && selectedCustomer.isMember && (
                    <Descriptions  title="会员信息" column={4}>
                        <Descriptions.Item label="会员类别">{selectedCustomer.cardType}</Descriptions.Item> 
                        <Descriptions.Item label="卡号">{selectedCustomer.cardNumber}</Descriptions.Item> 
                        <Descriptions.Item label="优惠折扣">{selectedCustomer.cardDiscount}</Descriptions.Item>
                        <Descriptions.Item label="卡内余额">{'¥'+selectedCustomer.cardValue}</Descriptions.Item>
                    </Descriptions>
                )}
                </div>
            </Content>
            </div>
            </div>

        </div>
    );
}

export default CheckPay;
