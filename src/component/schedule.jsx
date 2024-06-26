import React, {useEffect, useState} from 'react';
import {Tabs, Button, Tag, Card, Modal, Input} from 'antd'; // 假设使用Ant Design作为UI库
import {Form,Select,message} from "antd";
import postschedule from "../Service/PostScheduleService";
import {config} from "react-transition-group";
import Searchmember from "./Searchmember";
//import {Doctors} from "../data/Doctor";
//import member, {clients} from "../data/Member";
import {type} from "@testing-library/user-event/dist/type";
import {BookOutlined} from "@ant-design/icons";
import getschedule from "../Service/getSchedule";
import deleteschedule from "../Service/deleteSchedule";
import getDoctors from "../Service/getDoctors";
import getTypes from "../Service/GetTypes";
//import moment from "moment/moment";
import getMembers from "../Service/getMembers";
import getAllCards from "../Service/getAllCards";
import adjustBalance from "../Service/adjustBalance";
//import Member from "../data/Member";
const { TabPane } = Tabs;

// 模拟数据
const timeSlots = ['09:00-10:00', '10:00-11:00','11:00-12:00', '13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00'];
const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

let handlePaymodal=false;


function Schedule({ date2 ,clientlist}) {

    let startTimeParts=[];
    let indextime="";
    const [doctors,setDoctors] = useState([]);
    const [wholedoctor,setWholedoctor]=useState({});
    const [name,setName]=useState([]);
    const [members,setMembers]=useState([]);

    let selectedindex=0;
    let appointmentinformation= {
        name: "",
        phonenumber: 911,
        membership: "",
        type: "",
        appointmentStartTime: "",
        appointmentDate: "",
        appointmentStartHourindex: 0,
        appointmentStartMinutesindex: 0,
        appointmentEndHourindex: 0,
        appointmentEndMinutesindex: 0,
        appointmentEndTime: "",
        attribute:"",
        appointmentcost:0,
    }
    const [isMemberPaymentVisible, setIsMemberPaymentVisible] = useState(false);
    const [currentdate,setCurrentdate]=useState('');
    const[information,setInformation]=useState({})
    const [currentdoctor,setCurrentdoctor]=useState('') ;
    const [currenttimes, setCurrenttimes] = useState([
    ]);
    const [types,setTypes]=useState([]);
    // =[
    // {
    //     typename:"问诊  （约15分钟）",
    //     timecost:1,
    //     cost:40
    // },
    // {
    //     typename: "推拿  （约60分钟）",
    //     timecost: 4,
    //     cost:200
    // },
    // {
    //     typename:"针灸  （约45分钟）",
    //     timecost: 3,
    //     cost:240
    // },{
    //     typename:"正骨  （约30分钟）",
    //     timecost: 2,
    //     cost: 270
    // }]
    // useEffect(()=>setMembers(member)
    // , []);
    // useEffect(()=>setName(member.map((item,index)=>member[index].name),
    //     ),[])
    // useEffect(()=>setMembers(clientlist)
    //     , [clientlist]);
    let currentmember;
    const [date, setDate] = useState(date2 || "2023-08-25");
    const [cards,setCards]=useState([]);
    const [update,setUpdate]=useState(false);
    const [endappointment,setEndappointment]=useState(false);
    const [cancelupdate,setCancelupdate]=useState(false);
    const [appointmentData, setAppointmentData] = useState({});
    const [payed,setPayed]=useState(false);
    // useEffect(()=>setName(members.map((item,index)=>members[index].name),
    // ),[members])
    // useEffect(()=>setDoctors(Doctors.map(doctor=>doctor.fullname)
    // ,),[date2])

    useEffect(() => {
        const initialize = async () => {
            let data = await getDoctors();
            setDoctors(data.map(doctor => doctor.fullname));
            let data2=await getTypes();
            setTypes(data2);
            let data4=await getAllCards();
            let cardResults=[];
            data4.map(da4=>{
                let tmp={
                    cardName: da4.cardName,
                    cardBalance:da4.cardBalance,
                    cardDiscount:da4.cardDiscount,
                    memberPhone:da4.memberPhone,
                }

                cardResults.push(tmp);
            })
            setCards(cardResults);
            let date3=await getMembers();
            currentmember=date3[0];
            let results=[];
            date3.map(data3=>{
                let tmp={
                    name: data3.memberName,
                    gender: data3.memberGender,
                    age:data3.memberAge,
                    phoneNumber:data3.memberPhone,
                    cards:[],
                }
                cardResults.map(cardResult=>{
                    if(cardResult.memberPhone===tmp.phoneNumber){
                        tmp.cards.push(cardResult);
                    }
                })
                console.log(tmp);
                results.push(tmp);
            })
            console.log(results);
            setName(results.map((item,index)=>results[index].name));
            setMembers(results);
            await initializeAppointmentData(date2,data);
            console.log(appointmentData)
        };
        initialize();
    }, [date2]);

    console.log(cards);

    function TimeSlot({ date,doctorName, time, appointment }) {
        const [open, setOpen] = useState(false);
        const [paymentVision,setPaymentVision]=useState(false);
        const [open2,setOpen2]=useState(false);
        const [confirmLoading, setConfirmLoading] = useState(false);
        const [form] = Form.useForm();
        const [form2]=Form.useForm();
        const [currentcard,setCurrentcard]=useState(0)
        const [currentappointment,setCurrentappointment]=useState({});
        useEffect(() => {
            setOpen2(paymentVision);
        }, [paymentVision]);

        const handlesetCurrentcard=()=>{
            if(currentappointment!=={}&&currentappointment.name!==undefined) {
                const matchingClient = members.find(client => client.name === currentappointment.name);
                if (matchingClient !== null && matchingClient.cards[0].cardName !== "无卡") {
                    const currentamount = matchingClient.cards[0].cardBalance
                    setCurrentcard(currentamount);
                    console.log("找到了")
                }
            }
            else setCurrentcard(0);
        }
        useEffect(() => {
            handlesetCurrentcard()
        }, [currentappointment]);


        const showModal = () => {
            const parts = time.split('-');
            if (parts.length >= 1) {
                startTimeParts = parts[0].split(':');
                if (startTimeParts.length >= 1) {
                    console.log(startTimeParts[0]);
                }
            }
            if(selectedindex===0){
                indextime="00";
            }
            if(selectedindex===1){
                indextime="15";
            }
            if(selectedindex===2){
                indextime="30";
            }
            if(selectedindex===3){
                indextime="45";
            }
            appointmentinformation.appointmentStartTime=`${date2}-${startTimeParts[0]}:${indextime}`;
            appointmentinformation.appointmentDate=date2;
            appointmentinformation.appointmentStartHourindex=timeSlots.indexOf(time);
            appointmentinformation.appointmentStartMinutesindex=selectedindex;
            form.resetFields();
            console.log(selectedindex);
            setOpen(true);
        };
        const handleClick2=(index)=>{
            console.log("clicked");
            showModal2(index);
        }

        console.log(members);
        const endAppointment=()=>{
            let timeindex=currentappointment.appointmentStartHourindex;
            let x=date2.toString();
            let tmpindex=currentappointment.appointmentStartMinutesindex;
            const selectedtype = types.find(member => member.typename === currentappointment.type);
            console.log(currentappointment);
            console.log(selectedtype);
            let totalcost=selectedtype.timecost;
            let updatetimes=[];
            while(totalcost!==0){
                setCurrentdate(x);
                setCurrentdoctor(doctorName);
                let newitem={
                    time:timeindex,
                    index:tmpindex
                }
                setCurrenttimes(prevTimes => {
                    return [...prevTimes, newitem];
                });
                updatetimes.push(newitem);
                if(tmpindex===3){
                    tmpindex=0;
                    timeindex++;
                    totalcost--;
                }
                else{
                    tmpindex++;
                    totalcost--;
                }
            }
            async function postSchedules() {
                for (const currenttime of updatetimes) {
                    // 在这里定义information对象
                    const information1 = {
                        date: date2,
                        doctorName: doctorName,
                        hourindex: currenttime.time,
                        minuteIndex: currenttime.index,
                        name:appointmentinformation.name,
                        phonenumber:appointmentinformation.phonenumber,
                        attribute: "已诊",
                        type:appointmentinformation.type,
                        membership:appointmentinformation.membership,
                        appointmentStartTime:appointmentinformation.appointmentStartTime,
                        appointmentStartHourindex:appointmentinformation.appointmentStartHourindex,
                        appointmentStartMinutesindex:appointmentinformation.appointmentStartMinutesindex,
                        appointmentEndHourindex:appointmentinformation.appointmentEndHourindex,
                        appointmentEndMinutesindex:appointmentinformation.appointmentEndMinutesindex,
                        appointmentEndTime:appointmentinformation.appointmentEndTime,
                        appointmentcost:appointmentinformation.appointmentcost,
                    };
                    try {
                        // 使用async/await来等待postschedule请求完成
                        await postschedule(information1);
                    } catch (error) {
                        // 处理错误
                        console.error("postschedule请求失败:", error);
                    }
                }
            }
            postSchedules();
            setEndappointment(true);
            setOpen2(false);
            message.success('会员已成功确认就诊！');
        }

        const cancelAppointment=()=>{

            let timeindex=currentappointment.appointmentStartHourindex;
            let x=date2.toString();
            let tmpindex=currentappointment.appointmentStartMinutesindex;
            let updatetimes=[];
            const selectedtype = types.find(member => member.typename === currentappointment.type);
            let totalcost=selectedtype.timecost;
            while(totalcost!==0){
                setCurrentdate(x);
                setCurrentdoctor(doctorName);
                let newitem={
                    time:timeindex,
                    index:tmpindex
                }
                setCurrenttimes(prevTimes => {
                    return [...prevTimes, newitem];
                });
                updatetimes.push(newitem);
                if(tmpindex===3){
                    tmpindex=0;
                    timeindex++;
                    totalcost--;
                }
                else{
                    tmpindex++;
                    totalcost--;
                }
            }
            async function deleteSchedules({currentAppoitment}) {
                for (const currenttime of updatetimes) {
                    // 在这里定义information对象
                    const information1 = {
                        date: date2,
                        name:appointmentinformation.name,
                        phonenumber:appointmentinformation.phonenumber,
                        doctorName: doctorName,
                        hourindex: currenttime.time,
                        minuteIndex: currenttime.index,
                        attribute: "",
                        type:appointmentinformation.type,
                        membership:appointmentinformation.membership,
                        appointmentStartTime:appointmentinformation.appointmentStartTime,
                        appointmentStartHourindex:appointmentinformation.appointmentStartHourindex,
                        appointmentStartMinutesindex:appointmentinformation.appointmentStartMinutesindex,
                        appointmentEndHourindex:appointmentinformation.appointmentEndHourindex,
                        appointmentEndMinutesindex:appointmentinformation.appointmentEndMinutesindex,
                        appointmentEndTime:appointmentinformation.appointmentEndTime,
                        appointmentcost:appointmentinformation.appointmentcost,
                    };
                    try {
                        // 使用async/await来等待postschedule请求完成
                        await deleteschedule(information1);
                    } catch (error) {
                        // 处理错误
                        console.error("postschedule请求失败:", error);
                    }
                }
            }
            deleteSchedules();
            setCancelupdate(true);
            setOpen2(false);
            message.success('预约信息已成功删除！');
        }

        const showModal2=(index)=>{
            form2.resetFields();
            let timeindex=timeSlots.indexOf(time);
            //let tmpData = deepCopy(appointmentData);
            let x=date2.toString();
            setCurrentappointment(appointmentData[x][doctorName][timeindex][index])

            console.log(`${date2}-${startTimeParts[0]}:${indextime}`);
            setOpen2(true);
        }
        const handleCancel2=()=>{
            setOpen2(false);
            setPaymentVision(false);
        }
        const handleOk2=async ()=>{
            if(paymentVision===true&&currentcard>=currentappointment.appointmentcost){
                setCurrentcard(currentcard-currentappointment.appointmentcost);

                let timeindex=currentappointment.appointmentStartHourindex;
                let x=date2.toString();
                let updatetimes=[];
                let tmpindex=currentappointment.appointmentStartMinutesindex;
                const selectedtype = types.find(member => member.typename === currentappointment.type);
                let totalcost=selectedtype.timecost;
                while(totalcost!==0){
                    setCurrentdate(x);
                    setCurrentdoctor(doctorName);
                    let newitem={
                        time:timeindex,
                        index:tmpindex
                    }
                    setCurrenttimes(prevTimes => {
                        return [...prevTimes, newitem];
                    });
                    updatetimes.push(newitem);
                    if(tmpindex===3){
                        tmpindex=0;
                        timeindex++;
                        totalcost--;
                    }
                    else{
                        tmpindex++;
                        totalcost--;
                    }
                }
                try {
                    let balance = {
                        memberPhone: currentappointment.phonenumber,
                        cost: currentappointment.appointmentcost,
                    }
                    await adjustBalance(balance)
                    // 使用async/await来等待postschedule请求完成
                    setPayed(true);
                }catch (error){
                    message.error("余额不足，请去充值")
                }
                async function postSchedules() {
                    console.log(appointmentData);
                    console.log(currentappointment.appointmentcost);
                    for (const currenttime of updatetimes) {
                        // 在这里定义information对象
                        const information1 = {
                            date: date2,
                            name:appointmentinformation.name,
                            phonenumber:appointmentinformation.phonenumber,
                            doctorName: doctorName,
                            hourindex: currenttime.time,
                            minuteIndex: currenttime.index,
                            attribute: "已付费",
                            type:appointmentinformation.type,
                            membership:appointmentinformation.membership,
                            appointmentStartTime:appointmentinformation.appointmentStartTime,
                            appointmentStartHourindex:appointmentinformation.appointmentStartHourindex,
                            appointmentStartMinutesindex:appointmentinformation.appointmentStartMinutesindex,
                            appointmentEndHourindex:appointmentinformation.appointmentEndHourindex,
                            appointmentEndMinutesindex:appointmentinformation.appointmentEndMinutesindex,
                            appointmentEndTime:appointmentinformation.appointmentEndTime,
                            appointmentcost:appointmentinformation.appointmentcost,
                        };
                        try {
                            //console.log(currentappointment)
                           //  let balance={
                           //      memberPhone: currentappointment.phonenumber,
                           //      cost:currentappointment.appointmentcost,
                           //  }
                           // await adjustBalance(balance)
                           //  // 使用async/await来等待postschedule请求完成
                            await postschedule(information1);
                        } catch (error) {
                            // 处理错误
                            console.error("postschedule请求失败:", error);
                        }
                    }
                }
                postSchedules();
                message.success(`成功支付 余额为${currentcard-currentappointment.appointmentcost}元`);
                setOpen2(false);
                setPaymentVision(false);
            }
            if(paymentVision===true&&currentcard<currentappointment.appointmentcost){
                message.error({
                    content: '费用不足，请去充值！',
                    duration: 3,
                });
            }

        }
        const handleClick = (index) => {
            // handleIndexSelection(index);
            console.log("clicked");
            selectedindex=index;
            showModal();
        };

        const handleOk = () => {
            // console.log(information);
            form.validateFields().then(values=> {
                setInformation(appointmentinformation);
                let timeindex=timeSlots.indexOf(time);
                let x=date2.toString();
                let tmpindex=selectedindex;
                let judge=true;
                let judge2=true;
                let updatetimes=[];
                const selectedtype = types.find(member => member.typename === appointmentinformation.type);
                let totalcost=selectedtype.timecost;
                while(totalcost!==0){
                    if(timeindex===8||appointmentData[x][doctorName][timeindex][tmpindex].attribute!=="未预约"){
                        judge=false;
                        break;
                    }
                    else{
                        if(tmpindex===3){
                            tmpindex=0;
                            timeindex=timeindex+1;
                            totalcost--;
                            if(timeindex===3&&totalcost!==0){
                                judge2=false;
                                judge=false;
                                break;
                            }
                        }
                        else{
                            tmpindex++;
                            totalcost--;
                        }
                    }
                }
                console.log(judge);
                if(judge) {
                    timeindex=timeSlots.indexOf(time);
                    tmpindex=selectedindex;
                    totalcost=selectedtype.timecost;
                    setUpdate(true);
                    while(totalcost!==0){
                        setCurrentdate(x);
                        setCurrentdoctor(doctorName);
                        let newitem={
                            time:timeindex,
                            index:tmpindex
                        }
                        setCurrenttimes(prevTimes => {
                            return [...prevTimes, newitem];
                        });
                        updatetimes.push(newitem);
                        if(tmpindex===3){
                            tmpindex=0;
                            timeindex++;
                            totalcost--;
                        }
                        else{
                            tmpindex++;
                            totalcost--;
                        }
                    }
                    appointmentinformation.appointmentEndHourindex=timeindex;
                    appointmentinformation.appointmentEndMinutesindex=tmpindex;
                    let tmpHourIndex=timeindex;
                    let tmpMinutesIndex=tmpindex;
                    const parts =timeSlots[tmpHourIndex].split('-');
                    if (parts.length >= 1) {
                        startTimeParts = parts[0].split(':');
                        if (startTimeParts.length >= 1) {
                            console.log(startTimeParts[0]);
                        }
                    }
                    if(tmpMinutesIndex===0){
                        indextime="00";
                    }
                    if(tmpMinutesIndex===1){
                        indextime="15";
                    }
                    if(tmpMinutesIndex===2){
                        indextime="30";
                    }
                    if(tmpMinutesIndex===3) {
                        indextime = "45";
                    }
                    if(indextime==="00"&&startTimeParts[0]==="13"){
                        appointmentinformation.appointmentEndTime=`${date2}-12:00`;
                    }
                    else {
                        appointmentinformation.appointmentEndTime = `${date2}-${startTimeParts[0]}:${indextime}`;
                    }
                    console.log(currentdoctor);
                    console.log(appointmentinformation);
                    async function postSchedules() {
                        console.log(appointmentData);
                        for (const currenttime of updatetimes) {
                            // 在这里定义information对象
                            const information1 = {
                                date: date2,
                                name:appointmentinformation.name,
                                phonenumber:appointmentinformation.phonenumber,
                                doctorName: doctorName,
                                hourindex: currenttime.time,
                                minuteIndex: currenttime.index,
                                attribute: "已预约",
                                type:appointmentinformation.type,
                                membership:appointmentinformation.membership,
                                appointmentStartTime:appointmentinformation.appointmentStartTime,
                                appointmentStartHourindex:appointmentinformation.appointmentStartHourindex,
                                appointmentStartMinutesindex:appointmentinformation.appointmentStartMinutesindex,
                                appointmentEndHourindex:appointmentinformation.appointmentEndHourindex,
                                appointmentEndMinutesindex:appointmentinformation.appointmentEndMinutesindex,
                                appointmentEndTime:appointmentinformation.appointmentEndTime,
                                appointmentcost:appointmentinformation.appointmentcost,
                            };
                            try {
                                // 使用async/await来等待postschedule请求完成
                                await postschedule(information1);
                            } catch (error) {
                                // 处理错误
                                console.error("postschedule请求失败:", error);
                            }
                        }
                    }
                    postSchedules();
                    // console.log(tmpData);
                    //setAppointmentData(tmp);
                    form.resetFields();
                    //    console.log(JSON.stringify(information));
                    //    postcart(information);
                    setConfirmLoading(true);
                    setTimeout(() => {
                        setOpen(false);
                        setConfirmLoading(false);
                    }, 1);
                    message.success('预约信息已成功新增！');
                }
                else {
                    if(judge2===false){
                        message.error({
                            content: '处于医生休息时间',
                            duration: 3,
                        });
                    }
                    if(judge2===true) {
                        message.error({
                            content: '预约时间冲突',
                            duration: 3,  // 消息显示5秒
                        });
                    }
                }
            }).catch(errorInfo => {
                console.log('Validate Failed:', errorInfo);
                message.error({
                    content: '更新失败，请重试！',
                    duration: 3,  // 消息显示3秒

                });
            });
        };
        const handleCancel = () => {
            console.log('Clicked cancel button');
            setOpen(false);
        };

        const onfinish = (values) => {
            setInformation(appointmentinformation)
            console.log(appointmentinformation)
            console.log('Success:', values);
        };
        const onfinish2 = (values) => {
            setPaymentVision(false);
            console.log('Success:');
        };
        function renderPatientTag(patient, index) {
            if (patient.attribute==="未预约") {
                return (
                    <Tag key={`${doctorName}-${time}-${index}`} color="blue" style={{ marginRight: 8 ,
                        width:'15%',
                        height: '35px',
                        display: 'flex', // 使用Flexbox布局
                        alignItems: 'center', // 垂直居中子元素
                        justifyContent: 'center', // 水平居中子元素
                        marginLeft:'3%',
                        marginTop:'6px'
                    }} onClick={()=>handleClick(index)}>
                        空闲
                    </Tag>
                );
            }

            if (patient.attribute === "已预约") {
                return (
                    <Tag key={`${doctorName}-${time}-${index}`} color="pink" style={{
                        width:'15%',
                        height: '35px',
                        display: 'flex', // 使用Flexbox布局
                        alignItems: 'center', // 垂直居中子元素
                        justifyContent: 'center', // 水平居中子元素
                        marginLeft:'3%',
                        marginTop:'6px'
                    }} onClick={()=>handleClick2(index)}>{patient.name}</Tag>
                );
            }
            if (patient.attribute === "过时") {
                return (
                    <Tag key={`${doctorName}-${time}-${index}`} color="#c0c0c0" style={{
                        width:'15%',
                        height: '35px',
                        display: 'flex', // 使用Flexbox布局
                        alignItems: 'center', // 垂直居中子元素
                        justifyContent: 'center', // 水平居中子元素
                        marginLeft:'3%',
                        marginTop:'6px'
                    }} >过时</Tag>
                );
            }
            if (patient.attribute === "休假") {
                return (
                    <Tag key={`${doctorName}-${time}-${index}`} color="purple" style={{
                        width:'15%',
                        height: '35px',
                        display: 'flex', // 使用Flexbox布局
                        alignItems: 'center', // 垂直居中子元素
                        justifyContent: 'center', // 水平居中子元素
                        marginLeft:'3%',
                        marginTop:'6px'
                    }} >休假</Tag>
                );
            }
            if (patient.attribute === "已诊") {
                return(
                    <Tag key={`${doctorName}-${time}-${index}`} color="green" style={{
                        width:'15%',
                        height: '35px',
                        display: 'flex', // 使用Flexbox布局
                        alignItems: 'center', // 垂直居中子元素
                        justifyContent: 'center', // 水平居中子元素
                        marginLeft:'3%',
                        marginTop:'6px'
                    }} onClick={()=>handleClick2(index)}>{patient.name}</Tag>
                );
            }
            if (patient.attribute === "已付费") {
                return(
                    <Tag key={`${doctorName}-${time}-${index}`} color="yellow" style={{
                        width:'15%',
                        height: '35px',
                        display: 'flex', // 使用Flexbox布局
                        alignItems: 'center', // 垂直居中子元素
                        justifyContent: 'center', // 水平居中子元素
                        marginLeft:'3%',
                        marginTop:'6px'
                    }} onClick={()=>handleClick2(index)}>{patient.name}</Tag>
                );
            }

            // 如果有其他条件或默认情况
            return (
                <Tag color="blue" style={{
                    // ... 你的样式
                }} onClick={() => handleClick(index)}>空闲或其他状态</Tag>
            );
        }
        const handleOpenMemberPayment = () => {
            console.log(open2);
            setPaymentVision(true);
        }
        const handleMemberChange = (value) => {
            const selectedMemberData = members.find(member => member.name === value);
            appointmentinformation.name=value
            if (selectedMemberData) {
                currentmember=selectedMemberData;
                console.log(currentmember);
                appointmentinformation.phonenumber=selectedMemberData.phoneNumber
                appointmentinformation.membership=selectedMemberData.cards[0].cardName
                form.setFieldsValue({
                    '会员电话号': selectedMemberData.phoneNumber,
                    '会员卡类型': selectedMemberData.cards[0].cardName,
                });
            }
        };
        useEffect(()=>{},[appointmentData])
        const handlePhoneChange = (value) => {
            appointmentinformation.phonenumber=value
        }
        const handleTypeChange = (value) => {
            appointmentinformation.type=value;
            types.map((typevalue,index)=>{
                if(typevalue.typename===value){
                    appointmentinformation.appointmentcost=typevalue.cost;
                }
            })
        }
        const handleCardChange=(value)=>{
            appointmentinformation.membership=value
        }
        function handleUpdate(){
            if(update===true){
                setUpdate(false);
                currenttimes.map((currenttime)=>{
                        appointmentData[currentdate][currentdoctor][currenttime.time][currenttime.index]=information;
                        appointmentData[currentdate][currentdoctor][currenttime.time][currenttime.index].attribute="已预约";
                    }
                )
                setCurrenttimes([]);
            }
        }
        function handleCancelUpdate(){
            if(cancelupdate===true){
                setCancelupdate(false);
                currenttimes.map((currenttime)=>{
                    appointmentData[currentdate][currentdoctor][currenttime.time][currenttime.index]={};
                    appointmentData[currentdate][currentdoctor][currenttime.time][currenttime.index].attribute="未预约";
                })
                setCurrenttimes([]);
            }
        }
        function handleEndAppointment(){
            if(endappointment===true){
                setEndappointment(false);
                currenttimes.map((currenttime)=>{
                    appointmentData[currentdate][currentdoctor][currenttime.time][currenttime.index].attribute="已诊";
                })
                setCurrenttimes([]);
            }
        }

        function handlePayed(){
            if(payed===true){
                setPayed(false);
                currenttimes.map((currenttime)=>{
                    appointmentData[currentdate][currentdoctor][currenttime.time][currenttime.index].attribute="已付费";
                })
                setCurrenttimes([]);
            }
        }
        useEffect(()=>handleUpdate(),[update])
        useEffect(()=>handleCancelUpdate(),[cancelupdate])
        useEffect(()=>handleEndAppointment(),[endAppointment])
        useEffect(()=>handlePayed(),[payed])
        console.log(currentmember);
        console.log(paymentVision);
        console.log(open2);
        console.log(currentcard);
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {appointment.map((patient, index) => (
                    // patient ? (
                    //     <Tag key={`${doctorName}-${time}-${index}`} color="red" style={{
                    //     width:'15%',
                    //     height: '35px',
                    //     display: 'flex', // 使用Flexbox布局
                    //     alignItems: 'center', // 垂直居中子元素
                    //     justifyContent: 'center', // 水平居中子元素
                    //     marginLeft:'3%',
                    //     marginTop:'6px'
                    // }} onClick={()=>handleClick2(index)}>{patient.name}</Tag>
                    // ) : (
                    //     <Tag key={`${doctorName}-${time}-${index}`} color="blue" style={{ marginRight: 8 ,
                    //         width:'15%',
                    //         height: '35px',
                    //         display: 'flex', // 使用Flexbox布局
                    //         alignItems: 'center', // 垂直居中子元素
                    //         justifyContent: 'center', // 水平居中子元素
                    //         marginLeft:'3%',
                    //         marginTop:'6px'
                    //     }} onClick={()=>handleClick(index)}>
                    //         空闲
                    //     </Tag>
                    //     )
                    <React.Fragment key={`${doctorName}-${time}-${index}`}>
                        {renderPatientTag(patient, index)}
                    </React.Fragment>
                ))}
                <Modal
                    title="预约信息"
                    open={open2}
                    onOk={handleOk2}
                    onCancel={handleCancel2}
                >
                    {!paymentVision&&currentappointment && (currentappointment.attribute === '已预约'||currentappointment.attribute === '已付费') && (
                        <React.Fragment>
                            <Form form={form2} name="basic" autoComplete="off" onFinish={onfinish2}>
                                <Form.Item label="会员信息"
                                           name="会员信息"
                                >
                                    <Input defaultValue={currentappointment.name} readOnly/>
                                </Form.Item>
                            </Form>
                        </React.Fragment>
                    )}
                    {!paymentVision&&currentappointment && (currentappointment.attribute === '已诊') && (
                        <React.Fragment>
                            <div style={{
                                display:"flex",
                                flexDirection:"row"
                            }}>
                                <Form form={form2} name="basic" autoComplete="off" onFinish={onfinish2} style={{
                                    width:"50%"
                                }}>
                                    <Form.Item label="会员信息"
                                               name="会员信息"

                                    >
                                        <Input defaultValue={currentappointment.name} readOnly/>
                                    </Form.Item>
                                </Form>
                                <Form form={form2} name="basic" autoComplete="off" onFinish={onfinish2} style={{
                                    width:"50%"
                                }}>
                                    <Form.Item label="费用信息"
                                               name="费用信息"
                                    >
                                        <Input defaultValue={currentappointment.appointmentcost} readOnly/>
                                    </Form.Item>
                                </Form>
                            </div>
                        </React.Fragment>
                    )}
                    {!paymentVision&&(
                        <Form>

                            <Form.Item label="预约时间段"
                                       name="预约时间段"
                            >
                                <Input
                                    defaultValue={`${currentappointment.appointmentStartTime}--${currentappointment.appointmentEndTime}`}
                                    readOnly/>
                            </Form.Item>

                            <Form.Item label="会员电话号"
                                       name="会员电话号">
                                <Input defaultValue={currentappointment.phonenumber} readOnly/>
                            </Form.Item>
                            <div style={{
                                display: "flex",
                                flexDirection: "row"
                            }}>
                                <Form.Item
                                    label="会员卡类型"
                                    name="会员卡类型"
                                    style={{
                                        width: '50%'
                                    }}
                                >
                                    <Input defaultValue={currentappointment.membership} readOnly/>
                                </Form.Item>
                                <Form.Item label="预约服务"
                                           name="预约服务"
                                           rules={[
                                               {
                                                   message: '请输入预约服务类型',
                                               },
                                           ]}
                                           style={{
                                               width: '50%'
                                           }}>
                                    <Input defaultValue={currentappointment.type} readOnly/>
                                </Form.Item>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                {currentappointment && currentappointment.attribute === '已预约' && (
                                    <React.Fragment>
                                        <Button style={{marginLeft: '61%'}} onClick={cancelAppointment}>取消预约</Button>
                                        <Button style={{marginLeft: '2%'}} onClick={endAppointment}
                                                type="primary">确认就诊</Button>
                                    </React.Fragment>
                                )}
                                {currentappointment && currentappointment.attribute === '已诊' && (
                                    <React.Fragment>
                                        <Button
                                            onClick={handleOpenMemberPayment}
                                            style={{
                                                marginLeft:'73%'
                                            }}
                                            icon={<BookOutlined />}>会员卡扣费</Button>
                                        {/*{Payment()};*/}
                                    </React.Fragment>
                                )}
                            </div>

                        </Form>
                    )}
                    {
                        paymentVision&&(
                            <Form>
                                <div style={{
                                    display: "flex",
                                    flexDirection: 'row'
                                }}>
                                    <Form.Item label="会员信息"
                                               name="会员信息"
                                    >
                                        <Input
                                            defaultValue={currentappointment.name}
                                            readOnly/>
                                    </Form.Item>

                                    <Form.Item label="会员电话号"
                                               name="会员电话号">
                                        <Input defaultValue={currentappointment.phonenumber} readOnly/>
                                    </Form.Item>

                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}>
                                    <Form.Item
                                        label="会员卡类型"
                                        name="会员卡类型"
                                        style={{
                                            width: '50%'
                                        }}
                                    >
                                        <Input defaultValue={currentappointment.membership} readOnly/>
                                    </Form.Item>
                                    <Form.Item label="预约服务"
                                               name="预约服务"
                                               rules={[
                                                   {
                                                       message: '请输入预约服务类型',
                                                   },
                                               ]}
                                               style={{
                                                   width: '50%'
                                               }}>
                                        <Input defaultValue={currentappointment.type} readOnly/>
                                    </Form.Item>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}>
                                    <Form.Item
                                        label="会员卡余额"
                                        name="会员卡余额"
                                        style={{
                                            width: '50%'
                                        }}
                                    >
                                        <Input defaultValue={currentcard} readOnly/>
                                    </Form.Item>
                                    <Form.Item label="支付金额"
                                               name="支付金额"
                                               rules={[
                                                   {
                                                       message: '请输入预约服务类型',
                                                   },
                                               ]}
                                               style={{
                                                   width: '50%'
                                               }}>
                                        <Input defaultValue={currentappointment.appointmentcost} readOnly/>
                                    </Form.Item>
                                </div>
                            </Form>
                        )
                    }
                </Modal>

                <Modal
                    title="新增预约信息"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <Form form={form} name="basic" autoComplete="off" onFinish={onfinish}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Form.Item
                                label="会员信息"
                                name="会员信息"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入会员信息',
                                    },
                                ]}
                                style={{
                                    width: '40%',
                                }}
                            >
                                <Select
                                    showSearch
                                    placeholder="选择会员"
                                    optionFilterProp="children"
                                    onChange={handleMemberChange}
                                    filterOption={filterOption}
                                    options={name.map(value => ({
                                        value, label: value,
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item
                                label="预约时间"
                                name="预约时间"
                                style={{
                                    width:'55%',
                                    marginLeft:"3%"
                                }}
                            >
                                <Input defaultValue={`起始时间: ${date2}-${startTimeParts[0]}:${indextime}`} readOnly/>
                            </Form.Item>
                        </div>
                        <Form.Item label="会员电话号"
                                   name="会员电话号"
                                   rules={[
                                       {
                                           required: true,
                                           message: '请输入会员电话号码',
                                       },
                                   ]}>
                            <Input onChange={handlePhoneChange}/>
                        </Form.Item>
                        <div style={{
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <Form.Item
                                label="会员卡类型"
                                name="会员卡类型"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入会员卡类型',
                                    },
                                ]}
                                style={{
                                    width:'50%'
                                }}
                            >
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item label="预约服务"
                                       name="预约服务"
                                       rules={[
                                           {
                                               required: true,
                                               message: '请输入预约服务类型',
                                           },
                                       ]}
                                       style={{
                                           width:'50%'
                                       }}>
                                <Select
                                    showSearch
                                    placeholder="选择预约类型"
                                    optionFilterProp="children"
                                    onChange= {handleTypeChange}
                                    filterOption={filterOption}
                                    options = {types.map(value => ({
                                        value: value.typename,
                                        label: value.typename
                                    }))}
                                />
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>

            </div>
        );
    }
    function TabPanel({ doctorName, appointments }) {
        return (
            <div>
                {timeSlots.map((time, index) => (
                    <Card key={`${doctorName}-${time}`}>
                        <div style={{ marginBottom: '15px' }}>
                            <span style={{ fontWeight: 'bold' }}>{time}</span>
                            <TimeSlot doctorName={doctorName} time={time} appointment={appointments[index]} />
                        </div>
                    </Card>
                ))}
            </div>
        );
    }
    const [updateini,setUpdateini]=useState(false);
    function initializeAppointmentData(currentDate,Doctor) {
        if (!appointmentData[currentDate]) {
            console.log(Doctor)
            const newData={};
            newData[currentDate] = {};
            Doctor.map(doctor=>doctor.fullname).forEach(doctorName => {
                const isOnDuty = doctorName.onLeave !== currentDate;
                console.log(currentDate);
                console.log(isOnDuty);
                newData[currentDate][doctorName] = timeSlots.map((time,index) => {
                    let tmp = [{}, {}, {}, {}]
                    tmp.map((time,index)=>{
                            tmp[index].attribute="未预约";
                        }
                    )
                    let parts = currentDate.split('/');
                    let year = parseInt(parts[0], 10);
                    let month = parseInt(parts[1], 10) - 1;
                    let day = parseInt(parts[2], 10);

                    let hours="10";
                    const parts2 = time.split('-');
                    if (parts2.length >= 1) {
                        startTimeParts = parts2[0].split(':');
                        if (startTimeParts.length >= 1) {
                            console.log(startTimeParts[0]);
                            hours=startTimeParts[0];
                        }
                    }
                    console.log(currentDate);
                    var date3 = new Date(year, month, day);
                    var dayOfWeek = date3.getDay();
                    console.log(dayOfWeek);
                    var daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                    var dayOfWeekString = daysOfWeek[dayOfWeek];
                    console.log(dayOfWeekString)
                    console.log(doctorName);
                    let curdoctor;

                    Doctor.map(doctor=>{
                        if(doctor.fullname===doctorName){
                            curdoctor=doctor;
                        }
                    })
                    if(curdoctor.onLeave===dayOfWeekString){
                        console.log(curdoctor);
                        tmp.map((time,index)=>{
                                tmp[index].attribute="休假";
                            }
                        )
                    }
                    tmp.map((time,index)=>{
                        let minutes="0";
                        if(index===0){
                            minutes="00";
                        }
                        if(index===1){
                            minutes="15";
                        }
                        if(index===2){
                            minutes="30";
                        }
                        if(index===3) {
                            minutes = "45";
                        }
                        let seconds = 0;
                        let milliseconds = 0;
                        let date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
                        let currentDate=new Date();
                        if(date< currentDate&&(tmp[index].attribute==="未预约")){
                            tmp[index].attribute="过时";
                        }

                        //if()


                    })
                    return tmp;
                })
            });
            console.log(newData);
            const newobj={
                ...appointmentData,
                [currentDate]:newData[currentDate]
            }
            setAppointmentData(newobj);
            setUpdateini(true);
            console.log(updateini)
        }

    }

    //  console.log(doctors)
    const [loading, setLoading] = useState(true);


    async function initializeDoctors(){
        let data=await getDoctors();
        console.log(data);
    }

    useEffect(() => {
        setDate(date2);
        console.log(appointmentData[date2])
    }, [date2]);

    useEffect(()=>{
        if(updateini===true) {
            if (!appointmentData[date2]) {
                initializeAppointmentData(date2);
                console.log(appointmentData);
            }
            console.log(updateini);

            async function fetchSchedule() {
                setLoading(true);
                let data = await getschedule(date2);
                console.log(date2)
                console.log(data);
                console.log(members);
                if (data.length > 0) {
                    data.map(information => {
                        const inf = {
                            name: information.name,
                            phonenumber: information.phonenumber,
                            membership: information.membership,
                            type: information.type,
                            appointmentStartTime: information.appointmentStartTime,
                            appointmentDate: date2,
                            appointmentStartHourindex: information.appointmentStartHourindex,
                            appointmentStartMinutesindex: information.appointmentStartMinutesindex,
                            appointmentEndHourindex: information.appointmentEndHourindex,
                            appointmentEndMinutesindex: information.appointmentEndMinutesindex,
                            appointmentEndTime: information.appointmentEndTime,
                            attribute: information.attribute,
                            appointmentcost: information.appointmentcost,
                        }
                        console.log(inf);
                        console.log(appointmentData);
                        console.log(appointmentData[date2]);
                        if (appointmentData[date2]) {
                            console.log(information.doctor);
                            console.log(appointmentData[date2][information.doctor]);
                            appointmentData[date2][information.doctor][information.hourindex][information.minuteindex] = inf;
                            setAppointmentData(appointmentData);
                            setLoading(false);
                        }
                    })
                }
                setLoading(false);
            }
            setUpdateini(false);
            fetchSchedule();
        }
    },[updateini,date2])

    console.log(appointmentData);
    console.log(date2);
    console.log(doctors);
    if(loading) {
        return <div>Loading...</div>;
    }else{return(
        <Tabs>
            {appointmentData[date] && Object.keys(appointmentData[date]).map((doctorName) => (
                <TabPane tab={doctorName} key={doctorName}>
                    <TabPanel doctorName={doctorName} appointments={appointmentData[date][doctorName]} />
                </TabPane>
            ))}
        </Tabs>
    );
    }
}

export default Schedule;