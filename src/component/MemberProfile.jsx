import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { List, Card, Descriptions } from 'antd';
import {clients} from '../data/Member';

const MemberProfile = ({ getClientDetails }) => {
    const { phoneNumber } = useParams();
    const [memberInfo, setMemberInfo] = useState(null);

    useEffect(() => {
        if (phoneNumber) {
            loadMemberInfo(phoneNumber);
        }
    }, [phoneNumber]);

    const loadMemberInfo = async (phoneNumber) => {
        try {
            const data = await getClientDetails(phoneNumber);
            if (data) {
                setMemberInfo(data);
            } else {
                message.error('未找到对应的会员信息');
            }
        } catch (error) {
            message.error('加载会员信息时发生错误');
            console.error('Error loading member info:', error);
        }
    };

    return (
        <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={clients}
            renderItem={client => (
                <List.Item>
                    <Card title={client.name}>
                        <Descriptions size="small" column={1}>
                            <Descriptions.Item label="Gender">{client.gender}</Descriptions.Item>
                            <Descriptions.Item label="Age">{client.age}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{client.phoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="Doctor">{client.doctor}</Descriptions.Item>
                            <Descriptions.Item label="Amount">{client.amount}</Descriptions.Item>
                        </Descriptions>
                        {client.cards.map((card, index) => (
                            <Descriptions key={index} size="small" column={1}>
                                <Descriptions.Item label="Card Name">{card.cardName}</Descriptions.Item>
                                <Descriptions.Item label="Type">{card.cardType}</Descriptions.Item>
                                <Descriptions.Item label="Number">{card.cardNumber}</Descriptions.Item>
                                <Descriptions.Item label="Value">{card.cardValue}</Descriptions.Item>
                                <Descriptions.Item label="Discount">{card.cardDiscount}</Descriptions.Item>
                            </Descriptions>
                        ))}
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default MemberProfile;
