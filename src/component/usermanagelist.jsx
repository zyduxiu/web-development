import React, {useEffect, useState} from 'react';
import {Table, Button, Input, Card, Switch, message} from 'antd';
import {Link} from 'react-router-dom';
import '../css/button.css';
import Orders from "./orders";
import getorder from "../services/getorder";
import detail from "../services/getbook";
import getbooks from "../services/common";
import {getUsers} from "../services/getUsers";
import forbiduser from "../services/forbiduser";
const { Column, ColumnGroup } = Table;
const username=localStorage.getItem('username');

export default function UserManageList(){
   // const [checked,setChecked]=useState(true);
    const [userlist, setUserlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleforbid=async (usid)=>{
        let lists = await forbiduser(usid);
        console.log(lists)
        message.success("账号解禁/禁用操作已成功");
        fetchUsers();
    }

    const handleChange=(record)=>{
        console.log(record);
        const usid={
            id:record.userid
        }
        handleforbid(usid);
    }

    const fetchUsers = async () => {
        try {
            let lists = await getUsers();
            setUserlist(lists);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setIsLoading(false); // 数据加载完成后设置加载状态为false
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []); // 空依赖数组表示仅在组件挂载时执行
    console.log(userlist)
    if (isLoading) {
        return <div>Loading...</div>; // 在数据加载时显示加载状态
    }

    else{
        return (
            <div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <b style={{
                        fontSize: '2rem',
                        paddingLeft: '1%'
                    }}>Register</b>
                    <b style={{
                        fontSize: '2rem',
                        paddingLeft: '1%'
                    }}>Management</b>
                </div>
                <Table dataSource={userlist} style={{
                    marginTop: '2%'
                }}>
                    <ColumnGroup title="Name">
                        <Column title="Avator" dataIndex="avator" key="avator" render={(avator, record) => (
                            <>
                                <img src={record.imageUrl} alt="图片" style={{width: '60px', height: '60px'}}/>
                            </>
                        )}/>
                        <Column title="Name" dataIndex="name" key="name"/>
                    </ColumnGroup>
                    <Column title="E-mail" dataIndex="email" key="email"/>
                    <Column title="Surname" dataIndex="surname" key="surname"/>
                    <Column title="Status" dataIndex="status" key="status" render={(id, record) => {
                        //        console.log(record.userid);
                        return (
                            <>
                                <Switch defaultChecked={record.forbid} onChange={()=>{handleChange(record)}} />
                            </>
                        )
                    }}/>
                </Table>
            </div>
        );
    }
}