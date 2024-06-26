import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Layout, Space, List, Avatar, Button, Descriptions, Form, Modal, Input, message, Col } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import AddMember from './AddMember';
import getAllCards from '../Service/getAllCards';
import adjustBalance from '../Service/adjustBalance';

const { Sider, Content } = Layout;
const { Search } = Input;

function ClientInfo() {
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedCards, setSelectedCards] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [isRechargeModalVisible, setIsRechargeModalVisible] = useState(false);
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [form] = Form.useForm();
    const [cards, setCards] = useState({
        cardid:'',
        cardBalance:'',
        cardDiscount:'',
        memberPhone:'',
        cardNumber:'',
        cardName:'',
        memberName:''
    })
    const navigate = useNavigate();

    const fetchClients = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/members/getallmembers', {
                credentials: 'include'
            });
            const data = await response.json();
            setClientList(data);
        } catch (error) {
            console.error('Error fetching client list:', error);
        }
    };

    const fetchCards = async () => {
        try {
            const res = await getAllCards();
            setCards(res);
        }
        catch(e) {
            console.error("Error receiving cards", e);
        }
    };

    useEffect(() => {
        fetchClients();
        fetchCards();
    }, []);

    const handleSelectedClient = async (client) => {
        setSelectedClient(client);
        console.log("Updated selected client:", client);
        try {
            const cards = await getAllCards();
            const clientCards = cards.filter(card => card.memberPhone === client.memberPhone);
            setSelectedCards(clientCards);
            console.log("Your selected member card is:", clientCards);
        } catch (error) {
            console.error('Error fetching member cards:', error);
        }
    
    };
    console.log('a', selectedClient);
    console.log('b',selectedCards);
    console.log('com:',selectedCards[0]);
    console.log('c',cards);


    // const handleEditClientInfo = () => {
    //     if (selectedClient) {
    //         form.setFieldsValue({
    //             memberName: selectedClient.memberName,
    //             memberAge: selectedClient.memberAge,
    //             memberPhone: selectedClient.memberPhone,
    //         });
    //         setEditModalVisible(true);
    //     }
    // };

    const handleRecharge = async () => {
        if (!selectedCards.length) {
            message.error('该客户没有会员卡');
            return;
        }
        try {
            const res = await adjustBalance({
                memberPhone: selectedClient.memberPhone,
                cost: -rechargeAmount // 负数表示充值
            });
            message.success("会员卡余额更新成功！");
            setIsRechargeModalVisible(false);
            setRechargeAmount('');
        } catch (error) {
            message.error('更新会员卡余额失败');
            console.error('Error updating card balance:', error);
        }
    };

    const handleUpdateClient = async () => {
        try {
            const values = await form.validateFields();
            setClientList(prev => prev.map(client =>
                client.key === selectedClient.key ? { ...client, ...values } : client
            ));
            setSelectedClient(prev => ({ ...prev, ...values }));
            setEditModalVisible(false);
            message.success('会员信息已成功更新！');
        } catch (error) {
            message.error('更新失败，请重试！');
        }
    };

    const showRechargeModal = () => {
        if (!selectedClient) {
            message.error('请先选择一个客户');
            return;
        }
        setIsRechargeModalVisible(true);
    };

    const handleRechargeModalClose = () => {
        setIsRechargeModalVisible(false);
        setRechargeAmount('');
    };

    return (
        <Layout>
            <Sider width={300} style={{ background: 'whitesmoke' }}>
                <Space direction="vertical" size="medium" style={{ width: '100%' }}>
                    <Search placeholder="搜索客户" enterButton style={{ marginTop: 80, marginLeft: 15 }} />
                    <AddMember />
                </Space>
                <List
                    itemLayout='horizontal'
                    dataSource={clientList}
                    style={{ marginLeft: 15, marginTop: 18 }}
                    renderItem={client => (
                        <List.Item key={client.key} onClick={() => handleSelectedClient(client)} style={{ cursor: 'pointer', marginLeft: 10 }}>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={client.memberName}
                                description={`会员名称: ${client.memberName}`}
                            />
                        </List.Item>
                    )}
                />
            </Sider>
            <Content style={{ margin: '0 16px' }}>
                <div style={{ marginTop: 55, padding: 24, minHeight: 360, background: '#fff' }}>
                    {selectedClient && (
                        <>
                            <Col>
                                <Descriptions title="会员信息">
                                    <Descriptions.Item label="姓名">{selectedClient.memberName}</Descriptions.Item>
                                    <Descriptions.Item label="性别">{selectedClient.memberGender}</Descriptions.Item>
                                    <Descriptions.Item label="年龄">{selectedClient.memberAge}</Descriptions.Item>
                                    <Descriptions.Item label="电话号码">{selectedClient.memberPhone}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col>
                                <Button type="primary" onClick={showRechargeModal}>
                                    充值
                                </Button>
                                <Modal
                                    title="会员卡充值"
                                    visible={isRechargeModalVisible}
                                    onOk={handleRecharge}
                                    onCancel={handleRechargeModalClose}
                                >
                                    <Input
                                        placeholder="请输入充值金额"
                                        value={rechargeAmount}
                                        onChange={e => setRechargeAmount(e.target.value)}
                                    />
                                </Modal>

                            
                            </Col>
                        </>
                    )}
                </div>
                {selectedCards[0] && (
                    <div style={{ padding: 24, background: '#fff', marginTop: 24 }}>
                        <Descriptions title="会员卡信息">
                                <React.Fragment>
                                    <Descriptions.Item label="会员卡名称">{selectedCards[0].cardName}</Descriptions.Item>
                                    <Descriptions.Item label="会员卡号">{selectedCards[0].cardNumber}</Descriptions.Item>
                                    <Descriptions.Item label="会员卡余额">¥{selectedCards[0].cardBalance}</Descriptions.Item>
                                    <Descriptions.Item label="会员折扣">{selectedCards[0].cardDiscount}</Descriptions.Item>
                                </React.Fragment>                 
                        </Descriptions>
                    </div>
                )}

            </Content>
        </Layout>
    );
}

export default ClientInfo;
