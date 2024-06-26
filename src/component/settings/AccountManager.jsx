import React, {useEffect, useState} from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Card } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import getDoctors from "../../Service/getDoctors";
import getAccounts from "../../Service/getAccount";
import updateDoctors from "../../Service/updateDoctors";
import updateAccount from "../../Service/adjustAccount";
import AddAccount from "../../Service/AddAccount";
import deleteaccount from "../../Service/deleteAccount";

const AccountManager = () => {
    const [accounts, setAccounts] = useState([
        {id: 1, username: 'user1', joinedDate: '2023-01-01', name: 'John Doe', password: '123456', phone: '1234567890'},
        {id: 2, username: 'user2', joinedDate: '2023-01-02', name: 'Jane Doe', password: '654321', phone: '0987654321'}
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [form] = Form.useForm();
    const [account, setAccount] = useState(null);
    let update = false;
    const showModal = (account) => {
        setCurrentAccount(account);
        form.setFieldsValue(account ? {
            username: account.username,
            name: account.name,
            password: account.password,
            phone: account.phone
        } : {
            username: '',
            name: '',
            password: '',
            phone: ''
        });
        setIsModalVisible(true);
    };


    useEffect(
        () => {
            const initialize = async () => {
                let data = await getAccounts();
                setAccount(data);
            };
            initialize();
        }
        , [update])

    async function initialize() {
        let data = await getAccounts();
        setAccount(data);

    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleupdate=async (values)=>{
        if (currentAccount) {
            const updatedAccount = account.map(doc => doc.id === currentAccount.id ? {...currentAccount} : doc);
            console.log(updatedAccount);
            let accountChange={
                id:currentAccount.id,
                name:values.username,
            }
            try{
                let data = await updateAccount(accountChange);
                update = !update;
                initialize();
                console.log("haha");
                message.success("用户信息更新成功")
            }catch (error){
                message.error("用户名已存在")
            }

            //setDoctors(updatedDoctors);
        }

    }

    const handleadd=async (values)=>{
          //  const updatedAccount = account.map(doc => doc.id === currentAccount.id ? {...currentAccount} : doc);
         //   console.log(updatedAccount);
            let accountChange={
                username:values.username,
                email:values.email,
                password:values.password,
            }
            try{
                let data = await AddAccount(accountChange);
                update = !update;
                initialize();
                console.log("haha");
                message.success("用户信息更新成功")
            }catch (error){
                message.error("用户名已存在")
            }

            //setDoctors(updatedDoctors);

    }

    const handledelete=async(id)=>{
        let delid={
            id:id,
        }
        console.log(id)
        let data=await deleteaccount(delid);
        initialize();
        message.success("用户信息已经成功删除");
    }

    const handleOk = async () => {
        form.validateFields().then(values => {
            console.log(values);
            if (currentAccount) {
                // Edit account
                const updatedAccounts = account.map(acc =>
                    acc.id === currentAccount.id ? {...acc, ...values} : acc
                );
                handleupdate(values);
                setAccounts(updatedAccounts);
                //message.success('账号信息修改成功！');
            } else {
                // Add new account
                const newAccount = {
                    id: accounts.length + 1,
                    joinedDate: new Date().toISOString().slice(0, 10),
                    ...values
                };
                handleadd(values)
                setAccounts([...accounts, newAccount]);
                //message.success('账号添加成功！');
            }
            setIsModalVisible(false);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    const deleteAccount = async (id) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除这个账号吗？',
            onOk: () => {
                handledelete(id);
                message.success('账号删除成功！');
            }
        });
    };

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '加入日期',
            dataIndex: 'joinedDate',
            key: 'joinedDate',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button
                        icon={<EditOutlined/>}
                        onClick={() => showModal(record)}
                        style={{marginRight: 8}}
                    />
                    <Popconfirm
                        title="确定删除这个账号吗？"
                        onConfirm={() => deleteAccount(record.id)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Button
                            icon={<DeleteOutlined/>}
                            type="danger"
                        />
                    </Popconfirm>
                </>
            )
        },
    ];

    console.log(account)
    if (account!==null) {
        return (
            <>
                <Card style={{margin: '20px'}}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined/>}
                        onClick={() => showModal(null)}
                        style={{marginBottom: 16}}
                    >
                        添加账号
                    </Button>
                    <Table columns={columns} dataSource={account} rowKey="id"/>
                </Card>

                <Modal
                    title={currentAccount ? "修改账号" : "添加新账号"}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{required: true, message: '请输入用户名！'}]}
                        >
                            <Input/>
                        </Form.Item>
                        {!currentAccount && (
                            <>
                                <Form.Item
                                    name="email"
                                    label="邮箱"
                                    rules={[{required: true, message: '请输入邮箱！'}]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="密码"
                                    rules={[{required: true, message: '请输入密码！'}]}
                                >
                                    <Input.Password/>
                                </Form.Item>
                            </>
                        )}
                    </Form>
                </Modal>
            </>
        );
    }
    ;
}

export default AccountManager;