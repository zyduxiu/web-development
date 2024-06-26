import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';

const AccountDetail = () => {
    const userData = {
        username: "exampleUser",
        email: "user@example.com",
        password: "initialPassword" // 注意：实际应用中不应处理明文密码
    }


    const [user, setUser] = useState(userData);
    const [editing, setEditing] = useState(false);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        setEditing(false);
        // 模拟保存数据到服务器的操作
        console.log("Saved data: ", user);
        // 显示保存成功的提示
        message.success('修改成功！');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Card title="账户详情" style={{ width: 400, margin: "20px auto" }}>
            <Form layout="vertical">
                <Form.Item label="用户名">
                    <Input
                        value={user.username}
                        name="username"
                        onChange={handleChange}
                        disabled={!editing}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item label="邮箱">
                    <Input
                        value={user.email}
                        name="email"
                        onChange={handleChange}
                        disabled={!editing}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item label="密码">
                    <Input.Password
                        value={user.password}
                        name="password"
                        onChange={handleChange}
                        disabled={!editing}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                {editing ? (
                    <Button type="primary" onClick={handleSave} style={{ width: '100%' }}>保存</Button>
                ) : (
                    <Button onClick={handleEdit} style={{ width: '100%' }}>修改</Button>
                )}
            </Form>
        </Card>
    );
};

export default AccountDetail;