import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Checkbox, Form} from 'antd'
import {Space} from 'antd'
import {UserOutlined,LockOutlined,MailOutlined} from '@ant-design/icons';
import {Input,message} from 'antd';
import "../Css/Sign_in.css"
import "../Css/Sign_in background.css"
import {CSSTransition, TransitionGroup } from 'react-transition-group';

import { useHistory } from 'react-router-dom';
import getlogin from "../Service/Signupservice";
import postUser from "../Service/loginService";
let times=0;

export default function Login(){
    const navigate=useNavigate()
    const [isSignedUpVisible, setIsSignedUpVisible] = useState(true);

    // function handleLogin(){
    //     window.location.href="/home/";
    // }

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState(null);
    const [whethermanager,setWhethermanager]=useState(false);
    const [whetherlogin,setWhetherlogin]=useState();
    const [click,setClick]=useState(0);
    const [form2] = Form.useForm();
    console.log(times);
    console.log(username);
    console.log(password);

    const  signupUser=async (signup)=>{
        try {
            // 假设signupUser是一个返回Promise的函数
            let data = await postUser(signup);
            message.success("新用户注册成功")
            // 如果signUpUser成功，继续处理data
            console.log(data);
        } catch (error) {
            // 如果signUpUser失败，捕获错误
            console.error('注册失败:', error);
            message.error("注册失败,用户名已存在！")
            // 这里可以进一步处理错误，例如显示错误消息
        }

    }
    const handleSignup= ()=>{
        form2.validateFields().then( values=>
            {
                const signup = {
                    username: username,
                    email: email,
                    password: password
                }
                console.log(signup);
                let data=signupUser(signup);
                console.log(data);

            }
        ).catch(errorInfo => {
            console.log('Validate Failed:', errorInfo);
            message.error("注册信息错误")
        });
    }
    const handleUsername=(e)=>{
        setUsername(e.target.value);
    }

    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }

    const user={
        username:username,
        password:password,
    }

    const handleLogin=async ()=>{
        console.log("herre");
        let res=await getlogin(user);
        setWhetherlogin(res);
        times++;
        setClick(times);
        console.log(whetherlogin);
    }

    function handlejudge(){
        console.log(whetherlogin);
        if(whetherlogin!==undefined&&whetherlogin.title==="admin"){
            message.success('管理员登陆成功！');
            localStorage.setItem("admin","admin")
            setWhethermanager(true);
            navigate("/home");
            return;
        }
        if(whetherlogin!==undefined&&whetherlogin.title==="manager"){
            message.success('工作人员登陆成功！');
            localStorage.setItem("admin","manager")
            navigate("/home");
            return;
        }
        else{
            message.error({
                content: '登录失败，请重试！',
                duration: 3,
            });

        }
    }

    useEffect(()=>{
        handlejudge();}, [times]);

    const toggleSignUp = () => {
        setIsSignedUpVisible(!isSignedUpVisible);
    };
    const [state,setState]=useState(0);
    function handleclick(){
        setState(!state)
    }
    function sign_up(){
        return (

            <div>
                <div className="sign_up">
                    <Space size="large" direction="vertical">
                        <text style={{
                            position: "relative",
                            paddingLeft: "37%",
                            color: "darkgrey",
                            size: "large",
                            fontSize: "1.5rem"
                        }}>Sign up
                        </text>
                        <Form

                            form={form2}
                            name="register"
                            //  onFinish={onFinish}
                            style={{
                                maxWidth: 600,
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="nickname"
                                label="Username"
                                tooltip="What do you want others to call you?"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your nickname!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input onChange={handleUsername}/>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input onChange={handleEmail}/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password onChange={handlePassword} />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>


                        </Form>
                        <button className="btn" style={{
                            position: "absolute",
                            marginLeft: "20%"
                        }}
                                 onClick={handleSignup}
                        >Sign up
                        </button>
                    </Space>
                </div>
            </div>
        )
    }

    function Sign_in() {
        return (

            <div>

                <div className="sign_in">
                    <text style={{
                        position: "relative",
                        paddingLeft: "27%",
                        color: "darkgrey",
                        size: "large",
                        fontSize: "1.5rem"
                    }}>Sign In
                    </text>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        style={{
                            marginTop:'35px'
                        }}
                        // onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input onChange={handleUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                onChange={handlePassword}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={handleLogin} className="login-form-button"
                            style={{
                                marginLeft:'35%'
                            }}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }

    function sign_in_button(){
        return(
        <div class="sign_in_button">
            <div>
                <button class="btn" id="Adapt mode" onClick={toggleSignUp} style={{
                    opacity:"1",
                    marginLeft:'28%',
                    marginTop:'25%'
                }}>登录</button>
            </div>
        </div>
    )}
    function sign_up_button(){
        return(
            <div class="sign_up_button">
                <div>
                    <button class="btn" id="Adapt mode" onClick={toggleSignUp} style={{
                        opacity:"1",
                        marginLeft:'30%',
                        marginTop:'25%'
                    }}>注册</button>
                </div>
            </div>
        )}

    return (
            <div>
                <TransitionGroup>
                    {isSignedUpVisible ? (
                        <div>
                        <CSSTransition
                            timeout={500} // 动画的持续时间（毫秒）
                            classNames="sign_up" // CSS中定义的动画类名前缀
                            unmountOnExit // 当退出时卸载组件
                            mountOnEnter // 当进入时挂载组件
                        >
                            {sign_up()}
                            {/*{sign_in_button()}*/}
                        </CSSTransition>
                            {sign_up()}
                        {sign_in_button()}
                        </div>
                    ) : (
                        <div>
                            <CSSTransition
                                timeout={500} // 动画的持续时间（毫秒）
                                classNames="sign_in" // CSS中定义的动画类名前缀
                                unmountOnExit // 当退出时卸载组件
                                mountOnEnter // 当进入时挂载组件
                            >
                                {Sign_in()}
                                {/*{sign_in_button()}*/}
                            </CSSTransition>
                            {Sign_in()}
                            {sign_up_button()}</div>
                    )}
                </TransitionGroup>
            </div>
        )

}