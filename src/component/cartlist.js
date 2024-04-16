import React from 'react'
import {Table,Button,Input} from 'antd'
import Carts from "./Carts";
import {Link} from 'react-router-dom'
import '../css/button.css'
const { Search } = Input;
const { Column, ColumnGroup } = Table;

export default function Cartlist(){
    return(
        <div style={{
            display:'flex',
            flexDirection:'column'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <b style={{
                    fontSize: '2rem',
                    paddingLeft: '1%'
                }}>My</b>
                <b style={{
                    fontSize: '2rem',
                    paddingLeft: '1%'
                }}>Shopping</b>
                <b style={{
                    fontSize: '2rem',
                    paddingLeft: '1%'
                }}>List</b>
            </div>
            <Search size='large' style={{
                marginTop:'2%',
                height:'10%',
                width:'70%',
                marginLeft:'5%'
            }}>
            </Search>
            <Table dataSource={Carts()} style={{
                marginTop:'2%'
            }}>
                <ColumnGroup title="Name">
                    <Column title="Cover" dataIndex="cover" key="cover" render={(cover,record) => (
                        <>
                        <Link to={`/book/${record.id}`}>
                            <img src={cover} alt="图片" style={{ width: '100px', height: '120px' }}/>
                        </Link>
                        </>
                    )}/>
                    <Column title="Title" dataIndex="title" key="title"/>
                </ColumnGroup>
                <Column title="Amount" dataIndex="amount" key="amount"/>
                <Column title="Price" dataIndex="price" key="price"/>
                <Column title="Action" dataIndex="action" key="action" render={()=>(
                    <>
                        <Button type="primary">Delete</Button>
                    </>
                )}/>
            </Table>

            <Button className="btn2" style={{
                width:'100%'
            }}>Buy Now!
            </Button>
        </div>
    )
}