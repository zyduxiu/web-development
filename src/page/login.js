import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Button} from 'antd'
import {Space} from 'antd'
import {UserOutlined,LockOutlined,MailOutlined} from '@ant-design/icons';
import {Input} from 'antd';
import "../css/login.css"
import "../css/login_background.css"
import {CSSTransition, TransitionGroup } from 'react-transition-group';

export default function Loginpage(){
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
                {/*<Space>*/}
                {/*    <div className="left_page">*/}
                {/*        <button className="btn" onClick={()=>handleclick}>Sign in</button>*/}
                {/*    </div>*/}
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
                        <Input placeholder="default size" prefix={<UserOutlined/>} addonBefore="username"/>
                        <Input placeholder="default size" prefix={<MailOutlined />} addonBefore="E-mail"/>
                        <Input placeholder="default size" prefix={<LockOutlined/>} addonBefore="password"/>

                        <button className="btn" style={{
                            position: "absolute",
                            marginLeft: "0%"
                        }}>Sign up
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </Space>
                </div>
                {/*</Space>*/}
            </div>
        )
    }

    function sign_in() {
        return (

            <div>
                {/*<Space>*/}
                {/*    <div className="left_page">*/}
                {/*        <button className="btn" onClick={()=>handleclick}>Sign up</button>*/}
                {/*    </div>*/}
                <div className="sign_in">
                    <Space size="large" direction="vertical">
                        <text style={{
                            position: "relative",
                            paddingLeft: "37%",
                            color: "darkgrey",
                            size: "large",
                            fontSize: "1.5rem"
                        }}>Sign in
                        </text>
                        <Input placeholder="default size" prefix={<UserOutlined/>} addonBefore="username"/>
                        <Input placeholder="default size" prefix={<LockOutlined/>} addonBefore="password"/>
                        <a href="#" className="link" style={{
                            position: "relative",
                            paddingLeft: "35%",
                            color:'blue',
                            size: "large",
                        }}>Forgot your password?</a>
                        <button className="btn" style={{
                            position: "relative",
                            marginLeft: "0%"
                        }}>Sign in</button>
                    </Space>
                </div>
                {/*</Space>*/}
            </div>
        )
    }

    function sign_in_button(){
        return(
            <div class="sign_in_button">
                <div>
                    <button class="btn" id="Adapt mode" onClick={toggleSignUp} style={{
                        opacity:"1",
                        marginRight:'15%',
                        marginTop:'25%'
                    }}>Sign In</button>
                </div>
            </div>
        )}
    function sign_up_button(){
        return(
            <div class="sign_up_button">
                <div>
                    <button class="btn" id="Adapt mode" onClick={toggleSignUp} style={{
                        opacity:"1",
                        marginTop:'25%'
                    }}>Sign Up</button>
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
                            {sign_in()}
                            {/*{sign_in_button()}*/}
                        </CSSTransition>
                        {sign_in()}
                        {sign_up_button()}</div>
                )}
            </TransitionGroup>
        </div>
    )

}