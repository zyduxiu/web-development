import React, {useEffect, useState} from 'react'
import {Table, Button, Input, message, Upload} from 'antd'
import {Link} from 'react-router-dom'
import '../css/button.css'
import {getUser} from "../services/getUser";
import Profiles from "./profiles";
import detail from "../services/getbook";
import changeProfile from "../services/changeProfile";
import {PlusOutlined} from "@ant-design/icons";
const { TextArea } = Input

const { Search } = Input;

export default function Profilelist(){
    let boole=true;
    const [imageUrl,setImageUrl]=useState("");
    const [profiles,setProfiles]=useState({
        surname:"",
        imageUrl:"",
        name:"",
        instruction:"zz",
        email:"zz"
    });
    let pd=localStorage.getItem('username');
    const fetchUser=async (pd)=>{
        let data = await getUser(pd);
        setProfiles(data);
        setInstruction(data.instruction)
        setSurname(data.surname)
        setImageUrl(data.imageUrl);
        console.log(data);

    }
  //  console.log(imageUrl)
    const props = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
                message.error(`${file.name} is not a png file`);
            }else{
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setImageUrl(reader.result);
                };
                reader.onerror = () => {
                    // 转换失败时的处理
                    message.error('文件转换失败！');
                };
                return isPNG;
            }

        },
        onChange: (info) => {
            const { status } = info.file;
            console.log(info.fileList);
            if (status === 'removed') {
                setImageUrl(null);
            }
        },
    };

    console.log(imageUrl);
    useEffect(()=>{
        fetchUser(pd);}, []);
    console.log(profiles);
    const [instruction,setInstruction]=useState(profiles.instruction);
    const [surname,setSurname]=useState(profiles.surname)
    let profileinf={
        name:pd,
        surname:surname,
        instruction:instruction,
        imageUrl:imageUrl
    }
    const handleInstruction=(event)=>{
        setInstruction(event.target.value);
    }
    const handleSurname=(event)=>{
        setSurname(event.target.value);
    }
    const handleCancle=()=>{
        setSurname(profiles.surname);
        setInstruction(profiles.instruction);
        setImageUrl(profiles.imageUrl);
        boole=!boole;
    }
    useEffect(()=>{},[boole]);
    const handleOk=async ()=>{
        let data=await changeProfile(profileinf);
        message.success("用户信息已成功更新")
    }
    if(profiles.name) {
        return (
            <div>
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
                    <Input value={surname} onChange={handleSurname} size='large' style={{
                        position: 'absolute',
                        width: '35%',
                        marginTop: '120px'
                    }}></Input>
                    <Input value={profiles.name} size='large' style={{
                        position: 'absolute',
                        width: '35%',
                        marginLeft: '37%',
                        marginTop: '120px'
                    }} readOnly></Input>
                </div>
                <b style={{
                    position: 'absolute',
                    fontSize: '1.5rem',
                    marginTop: '190px'
                }}>
                    E-mail
                </b>
                <Input value={profiles.email} size='large' style={{
                    position: 'absolute',
                    width: '72%',
                    marginTop: '240px'
                }}></Input>
                <div style={{
                    display:'flex',
                    flexDirection:'row'
                }}>
                <b style={{
                    position: 'absolute',
                    fontSize: '1.5rem',
                    marginTop: '320px'
                }}>
                    Avatar
                </b>
                <div style={{
                    width: '30%', height: '30%',
                    marginLeft: '10px', marginRight: '50px', marginTop: '380px'
                }}>
                <Upload listType="picture-card"
                        defaultFileList={profiles.imageUrl ? [{ url: profiles.imageUrl }] : []}
                        {...props}
                       >
                    {!imageUrl && (
                        <button
                            style={{
                                border: 0,
                                background: 'none',
                            }}
                            type="button"
                        >
                            <PlusOutlined/>
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </button>
                    )}
                </Upload>
                </div>
                {/*<img src={profiles.imageUrl} style={{*/}
                {/*    width: '15%', height: '15%',*/}
                {/*    marginLeft: '10px', marginRight: '50px', marginTop: '380px'*/}
                {/*}}></img>*/}
                <b style={{
                    position: 'absolute',
                    fontSize: '1.5rem',
                    marginTop: '320px',
                    marginLeft: '20%'
                }}>
                    Note
                </b>

                <TextArea rows={6} value={instruction} onChange={handleInstruction}
                          style={{
                              position: 'absolute',
                              fontSize: '1rem',
                              marginTop: '370px',
                              width: '35%',
                              marginLeft: '20%'
                          }}/>
                <Button type='primary' style={{
                    width: '80px',
                    position: 'absolute',
                    fontSize: '1.3rem',
                    marginTop: '590px',
                    paddingBottom: '40px',
                    marginLeft: '30%'
                }} onClick={handleOk}>Save</Button>
                <Button type='default' style={{
                    width: '90px',
                    position: 'absolute',
                    fontSize: '1.3rem',
                    marginTop: '590px',
                    marginLeft: '38%',
                    paddingBottom: '40px',
                    paddingRight: '20px',
                }} onClick={handleCancle}>Cancel</Button>
                </div>
            </div>

        )
    }
}