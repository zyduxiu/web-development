import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import checksession from "../Service/checksession";
import {message} from "antd";
// import checkadmin from "../services/checkadmin";

const PrivateRoute = ({ element, userTypeRequired, ...rest }) => {
    const [isAuth, setIsAuth] = useState(null);
    const [userType, setUserType] = useState(null);
    const [type,setType]=useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await checksession()
                    .then(data=>{
                        console.log(data);
                        setIsAuth(true);
                    }).catch(error=>{
                        if (error.response && error.response.status === 400) {
                            console.log(response)
                            message.error("请先登录");
                        } else {
                            message.error("请先登录");
                        }
                        setIsAuth(false);
                    })
            }catch (error) {
                // 这里处理try块中代码的直接异常
                console.error('Error in try block:', error);
                // message.error("错误");

            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     const fetchAdmin = async () => {
    //         try {
    //             const response = await checkadmin()
    //                 .then(data=>{
    //                     console.log(data);
    //                     setUserType(1);
    //                     setType(1);
    //                 }).catch(error=>{
    //                     if (error.response && error.response.status === 400) {
    //                         console.log(response)
    //                         //message.error("非管理员不能访问");
    //                     } else {
    //                         //message.error("非管理员不能访问");
    //                     }
    //                     // setUserType(false);
    //                 })
    //         }catch (error) {
    //             // 这里处理try块中代码的直接异常
    //             console.error('Error in try block:', error);
    //             // message.error("错误");
    //
    //         }
    //     };
    //
    //     fetchAdmin();
    // }, [isAuth]);


    // useEffect(() => {
    //     const fetchUserType = async () => {
    //         const user = await getUser();
    //         setUserType(user?.userType);
    //     };
    //
    //     fetchUserType();
    // }, [isAuth]);

    if (isAuth === null) {
        return null;
    }
    console.log(isAuth);
    if (!isAuth) {
        return <Navigate to="/" />;
    }

    if (userTypeRequired !== undefined && userType !== userTypeRequired) {
        return <Navigate to="/" />;
    }
    return element;
};

export default PrivateRoute;