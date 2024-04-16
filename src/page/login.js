import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Button} from 'antd'
import {Space} from 'antd'
import {UserOutlined,LockOutlined,MailOutlined} from '@ant-design/icons';
import {Input} from 'antd';
import "../css/login.css"
import "../css/login_background.css"
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import getlogin from "../services/login";
import {useNavigate} from "react-router-dom";
import Modal from "../component/FailModal";
export default function Loginpage(){
    const navigate=useNavigate()
    const [username,setUsername]=useState(null);
    const [password,setPassword]=useState(null);
    const [whetherlogin,setWhetherlogin]=useState(null);
    const [click,setClick] = useState(0);
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
    const user= {
        username:username,
        password:password,
}

    const handleClick=async ()=>{
        let res=await getlogin(user);
        setWhetherlogin(res);
        times++;
        setClick(times)
        // console.log(whetherlogin);
    }
    function handlejudge(){
        if(whetherlogin){
            navigate("/home");
        }
        if(whetherlogin!==null&&!whetherlogin){


        }
    }

    useEffect(()=>{
        handlejudge();}, [click]);

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

    function Sign_in() {
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
                        <div style={{
                            display:'flex',
                            flexDirection:'row'
                        }}>
                            <Input placeholder="default size" id="userblank" onChange={handleusernamechange} prefix={<UserOutlined/>} addonBefore="username" ></Input>

                        </div>
                        <Input placeholder="default size"  id="passwordblank" onChange={handlepasswordchange} prefix={<LockOutlined/>} addonBefore="password" ></Input>
                        <a href="#" className="link" style={{
                            position: "relative",
                            paddingLeft: "35%",
                            color:'blue',
                            size: "large",
                        }}>Forgot your password?</a>
                        <button className="btn" onClick={handleClick} style={{
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
                            timeout={500}
                            classNames="sign_in"
                            unmountOnExit
                            mountOnEnter
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