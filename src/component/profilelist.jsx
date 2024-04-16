import React from 'react'
import {Table,Button,Input} from 'antd'
import {Link} from 'react-router-dom'
import '../css/button.css'
import Profiles from "./profiles";
const { TextArea } = Input

const { Search } = Input;

export default function Profilelist(){
    return(
        <div>
            <div style={{
                position: 'absolute',
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
                }}>Profile</b>
            </div>
            <b style={{
                position: 'absolute',
                fontSize: '1.5rem',
                marginTop: '70px'
            }}>
                Name
            </b>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Input defaultValue={Profiles()[0].surname} size='large' style={{
                    position: 'absolute',
                    width: '35%',
                    marginTop: '120px'
                }}></Input>
                <Input defaultValue={Profiles()[0].name} size='large' style={{
                    position: 'absolute',
                    width: '35%',
                    marginLeft: '37%',
                    marginTop: '120px'
                }}></Input>
            </div>
            <b style={{
                position: 'absolute',
                fontSize: '1.5rem',
                marginTop: '190px'
            }}>
                E-mail
            </b>
            <Input defaultValue={Profiles()[0].Email} size='large' style={{
                position: 'absolute',
                width: '72%',
                marginTop: '240px'
            }}></Input>
            <b style={{
                position: 'absolute',
                fontSize: '1.5rem',
                marginTop: '320px'
            }}>
                Avatar
            </b>
            <img src={require(`../pic/${Profiles()[0].imageUrl}`)} style={{
                width: '15%', height: '15%',
                marginLeft: '10px', marginRight: '50px', marginTop: '380px'
            }}></img>
            <b style={{
                position: 'absolute',
                fontSize: '1.5rem',
                marginTop: '320px',
                marginLeft: '20%'
            }}>
                Note
            </b>

                <TextArea rows={6} defaultValue={Profiles()[0].instruction} style={{
                    position: 'absolute',
                    fontSize: '1rem',
                    marginTop: '370px',
                    width: '35%',
                    marginLeft: '20%'
                }}/>
                <Button type='primary' style={{
                    width:'80px',
                    position: 'absolute',
                    fontSize: '1.3rem',
                    marginTop: '590px',
                    paddingBottom:'40px',
                    marginLeft: '30%'
                }}>Save</Button>
                <Button type='default' style={{
                    width:'90px',
                    position: 'absolute',
                    fontSize: '1.3rem',
                    marginTop: '590px',
                    marginLeft: '38%',
                    paddingBottom:'40px',
                    paddingRight:'20px',
                }}>Cancel</Button>
        </div>

)
}