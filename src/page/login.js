import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Button, Checkbox, Form} from 'antd'
import {Space,message} from 'antd'
import {UserOutlined,LockOutlined,MailOutlined} from '@ant-design/icons';
import {Input} from 'antd';
import "../css/login.css"
import "../css/login_background.css"
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import getlogin from "../services/login";
import {useNavigate} from "react-router-dom";
import postUser from "../services/postUser";
export default function Loginpage(){
    const navigate=useNavigate()
    const [username,setUsername]=useState(null);
    const [password,setPassword]=useState(null);
    const [email,setEmail]=useState(null);
    const [whetherlogin,setWhetherlogin]=useState(null);
    const [click,setClick] = useState(0);
    const [jwt,setJwt]=useState("");
    const [form2] = Form.useForm();
    let times=0;

    // const handleCloseModal = () => {
    //     setShowModal(false);
    // };
    const handleusernamechange=(e)=>{
        setUsername(e.target.value);
    }
    const handlepasswordchange=(e)=>{
        setPassword(e.target.value);
    }
    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }
    const user= {
        username:username,
        password:password,
    }

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
    const handleClick=async ()=>{
       let res=await getlogin(user);
       console.log(res);
       // setJwt(res.jwt);
        handlejudge(res);
         console.log(whetherlogin);
    }
    function handlejudge(jwt){
        console.log(jwt)
        if(jwt.ok){
            message.success('登陆成功！')
            message.success(`欢迎您 , ${username}`)
            navigate("/home");
        }
        else{
            message.error({
                content: '登录失败，请重试！',
                duration: 3,  // 消息显示3秒

            });

        }
    }


    const [isSignedUpVisible, setIsSignedUpVisible] = useState(false);

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
                                <Input onChange={handleusernamechange}/>
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
                                <Input.Password onChange={handlepasswordchange} />
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
                            marginLeft: "0%"
                        }} onClick={handleSignup}>Sign up
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
                            <Input onChange={handleusernamechange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                                onChange={handlepasswordchange}
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
                            <Button type="primary" htmlType="submit" onClick={handleClick} className="login-form-button">
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
                    <button className="btn" id="Adapt mode" onClick={toggleSignUp} style={{
                        opacity:"1",
                        marginRight:'15%',
                        marginTop:'25%'
                    }}>Sign In</button>
                </div>
            </div>
        )}
    function sign_up_button(){
        return(
            <div className="sign_up_button">
                <div>
                    <button className="btn" id="Adapt mode" onClick={toggleSignUp} style={{
                        opacity:"1",
                        marginTop:'25%',
                        marginRight:'15%',
                    }}>Sign Up</button>
                </div>
            </div>
        )}

    return (
        <div className="loginpage">
            <TransitionGroup>
                {isSignedUpVisible ? (
                    <div>
                        <CSSTransition
                            timeout={500}
                            classNames="sign_up"
                            unmountOnExit
                            mountOnEnter

                        />
                        {sign_up()}
                        {sign_in_button()}
                    </div>
                ) : (
                    <div>
                        <CSSTransition
                            timeout={500}
                            classNames="sign_in"
                            unmountOnExit
                            mountOnEnter
                        />
                        {Sign_in()}
                        {sign_up_button()}</div>
                )}
            </TransitionGroup>
        </div>
    )

}