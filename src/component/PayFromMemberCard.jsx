import React, { useState } from 'react';
import {
    BookOutlined,
} from '@ant-design/icons';
import { Button, Modal, Input, Descriptions, message } from 'antd';
import adjustBalance from '../Service/adjustBalance';
import updatePay from "../Service/updatePay";

function PayFromMemberCard({currentAppointment}) {
    console.log(currentAppointment);
    let pay=false;
    const [whetherpay,setWhetherpay]=useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

    const [memberInfo, setMemberInfo] = useState({
        memberName: '',
        cardBalance: 0,
        cardName: ''
    });
   console.log(currentAppointment);
    const handlePayment = async () => {

        setIsPaymentModalVisible(true);
    }


    const handlepay = async () => {
        try {
            console.log(memberInfo);
            console.log(currentAppointment);
            let balance = {
                memberPhone: memberInfo.memberPhone,
                cost: currentAppointment.appointmentcost,
            };
            let timerange={
                startHourindex:currentAppointment.
                    appointmentStartHourindex,
                endHourindex:currentAppointment.appointmentEndHourindex,
                startMinuteindex:currentAppointment.appointmentStartMinutesindex,
                endMinuteindex:currentAppointment.appointmentEndMinutesindex
                ,
                date:currentAppointment.date,
                doctor:currentAppointment.doctor,
            }
            let p=await updatePay(timerange);
            console.log(balance);
            // 返回一个 Promise
            let k= await adjustBalance(balance);
            setIsPaymentModalVisible(false);
            message.success("已成功支付")
            setWhetherpay(false);
            // 使用async/await来等待postschedule请求完成
            //setPayed(true);
        } catch (error) {
            message.error("余额不足，请去充值");
            setIsPaymentModalVisible(false);
            throw error; // 或者使用 rethrow 语句来重新抛出错误
        }
    };

    const handleCloseModal = () => {
        setIsPaymentModalVisible(false);
        setPhoneNumber("");
        setMemberInfo(null);
        setWhetherpay(false);
    }

    const handlepayi=async ()=>{
        let k=await handlepay();
    }
    const handleConfirm = async () => {
        if (!phoneNumber) {
            message.error("请输入电话号码");
            return;
        }

        try {
            // 使用 fetch 获取会员信息
            const response = await fetch(`http://localhost:8080/api/getMemberInfo?phoneNumber=${phoneNumber}`, {
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("会员信息未找到");
            }
            const data = await response.json();
            console.log(data);

            // 处理会员信息
            if (whetherpay === false) {
                setMemberInfo(data);
                message.success("会员信息加载成功");
                setWhetherpay(true);
            } else if (whetherpay === true) {
                // 使用 await 来等待 handlepay 函数的执行结果
                setWhetherpay(false);
                let p = await handlepay();
                setIsPaymentModalVisible(false);
                message.success("已成功支付")
                // 处理返回的结果...
            }
        } catch (error) {
            message.error(error.message);
            setMemberInfo(null);
            setWhetherpay(false);
        }
    };



    console.log(memberInfo);
    // const handlePaymentWithMemberCard = async () => {
    //     if (memberInfo.cardBalance >= currentappointment.appointmentcost) {
    //         try {
    //             let balance = {
    //                 memberPhone: phoneNumber,
    //                 cost: currentappointment.appointmentcost,
    //             }
    //             await adjustBalance(balance);

    //             setCurrentcard(memberInfo.cardBalance - currentappointment.appointmentcost);
    //             message.success(`支付成功，余额为${memberInfo.cardBalance - currentappointment.appointmentcost}元`);
    //             handleCloseModal();
    //         } catch (error) {
    //             message.error("支付失败，请重试");
    //         }
    //     } else {
    //         message.error("余额不足，请充值");
    //     }
    // }

    return (
        <div>
            <Button onClick={handlePayment} icon={<BookOutlined />}>会员卡扣费</Button>
            <Modal
                title="输入会员电话号码"
                visible={isPaymentModalVisible}
                onOk={handleConfirm}
                onCancel={handleCloseModal}
                okText="确认"
                cancelText="取消"

            >
                <Input
                    placeholder="请输入电话号码"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                />
                {memberInfo && (
                    <Descriptions bordered style={{ marginTop: 12 }}>
                        <Descriptions.Item label="会员名">{memberInfo.memberName}</Descriptions.Item>
                        <Descriptions.Item span={3} label="余额">{`¥${memberInfo.cardBalance}`}</Descriptions.Item>
                        <Descriptions.Item label="持有卡类型">{memberInfo.cardName}</Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
}

export default PayFromMemberCard;
