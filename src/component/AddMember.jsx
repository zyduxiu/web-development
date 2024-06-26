import React, { useState } from 'react';
import { Modal, Button, Input, Form, Select, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { PREFIX } from '../Service/profile';

import '../Css/Profile.css';

const today = new Date();
const expiredDate = new Date(today.setDate(today.getDate() + 30));
const formattedDate = expiredDate.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
});

function AddMember() {
    const [form] = Form.useForm();
    const [member, setMember] = useState({
        memberName: '',
        memberAge: '',
        memberGender: '',
        memberEmail:'',
        memberAddress: '',
        memberPhone: '',
        cashIn: '',
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const addNewClient = async (clientData) => {
        console.log("Adding member: ", JSON.stringify(clientData));
        try {
            const response = await fetch(`${PREFIX}/members/add`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(clientData),
                credentials: "include"
            });
    
            if (!response.ok) {
                throw new Error("Server responded with an error!");
            }
    
            if (response.headers.get("content-type")?.includes("application/json")) {
                const responseData = await response.json();
                message.success('会员添加成功');
                console.log(responseData);
            } else {
                const textData = await response.text();  // 获取非JSON响应体
                console.error("Received non-JSON response:", textData);
                throw new Error("Received non-JSON response: " + textData);
            }
        } catch (error) {
            console.error("Network or server error:", error);
            message.error(error.message || "Network or server error");
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
            setMember(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await addNewClient(values);
            form.resetFields();
            setIsModalVisible(false);
        } catch (info) {
            console.error('Validate Failed:', info);
            message.error('表单验证失败，请检查输入');
        }
    };

    return (
        <div>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={showModal} style={{ marginLeft: 20, marginTop: 15 }}>
                添加会员
            </Button>

            <Modal title="添加会员" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="memberName" label="姓名" rules={[{ required: true, message: '请输入客户姓名' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="memberGender" label="性别" rules={[{ required: true, message: '请选择客户性别' }]}>
                        <Select>
                            <Select.Option value="男">男</Select.Option>
                            <Select.Option value="女">女</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="memberEmail" label="邮箱地址" rules={[{ required: true, message: '请输入客户邮箱地址' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="memberPhone" label="手机号码" rules={[{ required: true, message: '请输入客户手机号码' },
                        { pattern: /^\d{11}$/, message: '手机号码必须为11位数字' }]}>
                        <Input 
                            type='number'
                            maxLength={11}
                        />
                    </Form.Item>

                    <Form.Item name="memberAge" label="年龄" rules={[{ required: true, message: '请输入客户年龄' }]}>
                        <Input 
                            type='number'
                        />
                    </Form.Item>

                    <Form.Item name="memberAddress" label="住址" rules={[{ required: true, message: '请输入客户家庭住址' },
                       ]}>
                        <Input 
                            type='text'
                        />
                    </Form.Item>

                    <Form.Item name="cashIn" 
                            label="充值金额" 
                            rules={[{ required: true, message: '请输入客户充值金额' }]}>
                        <Input 
                            type='number'
                            // onChange={handleTopUpChange} 
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddMember;
