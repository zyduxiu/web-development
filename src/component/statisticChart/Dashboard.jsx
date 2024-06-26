import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Card, Col, Row, Typography, Space, Statistic, Divider } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import getDoctors from "../../Service/getDoctors";
import getAllAppointments from "../../Service/getAllAppointments";
import getTypes from "../../Service/GetTypes";

// import '../../Css/test.css'

const { Title } = Typography;
const Dashboard = ({  }) => {
    const moment = require('moment');
    const [data, setData] = useState([]);
    useEffect(
        () => {
            const initialize = async () => {
                let datax = await getAllAppointments();
                let data2 = await getTypes();
                console.log(datax);
                let results = [];
                datax.map(da => {
                    let tmp = {
                        patientName: da.name,
                        doctor: da.doctor,
                        itemType: da.type,
                        originalPrice: da.appointmentcost,
                        actualPrice: da.appointmentcost,
                        commission: 0,
                        profit: 0,
                        chargeDate: "2023-05-15",
                        chargeTime: "08:30:00",
                        paymentMethod: "微信"
                    }
                    data2.map(da2 => {
                        if (da2.type === tmp.type) {
                            tmp.commission = da2.commission;
                            tmp.profit = tmp.actualPrice - tmp.commission;
                        }
                    })
                    let date = da.cashDate; // 假设这是您要格式化的日期对象
                    let date22 =  new Date(date);
                    let formattedDate = date22.toLocaleDateString();
                    let Date2 = new Date(formattedDate.replace(/\//g, '-')); // 将斜杠替换为连字符，以兼容 Date.parse
                    let formattedDate2 = Date2.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
                    console.log(formattedDate);
                    tmp.chargeDate=formattedDate2;
                    results.push(tmp);
                })
                console.log(results);
                setData(results);
            };

            initialize();
        }
        , [])

    async function initialize() {
        let datax = await getDoctors();
        setData(data);
    };


    console.log(data);
// 使用moment获取今天的日期和本月份
    const today = moment().format('YYYY-MM-DD'); // 今天的日期
    const currentMonth = moment().format('YYYY-MM'); // 本月份

// 计算总数和筛选数据
    const totalRevenue = data.reduce((acc, curr) => acc + curr.actualPrice, 0);
    const totalTransactions = data.length;
    const totalCommission = data.reduce((acc, curr) => acc + curr.commission, 0);
    const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);

// 今日数据
    const todayData = data.filter(item => item.chargeDate === today);
    const todayRevenue = todayData.reduce((acc, curr) => acc + curr.actualPrice, 0);
    const todayTransactions = todayData.length;
    const todayCommission = todayData.reduce((acc, curr) => acc + curr.commission, 0);
    const todayProfit = todayData.reduce((acc, curr) => acc + curr.profit, 0);

// 本月数据
    const monthData = data.filter(item => item.chargeDate.startsWith(currentMonth));
    const monthRevenue = monthData.reduce((acc, curr) => acc + curr.actualPrice, 0);
    const monthTransactions = monthData.length;
    const monthCommission = monthData.reduce((acc, curr) => acc + curr.commission, 0);
    const monthProfit = monthData.reduce((acc, curr) => acc + curr.profit, 0);
    // 准备图表数据（按月汇总）
    const trendData = data.reduce((acc, curr) => {
        const monthKey = moment(curr.chargeDate).format("YYYY-MM");
        if (!acc[monthKey]) {
            acc[monthKey] = {
                name: monthKey,
                Revenue: 0,
                Transactions: 0,
                Profit: 0
            };
        }
        acc[monthKey].Revenue += curr.actualPrice;
        acc[monthKey].Transactions += 1;
        acc[monthKey].Profit += curr.profit;
        return acc;
    }, {});

    // 将对象转换为数组
    const chartData = Object.values(trendData);

    if (data !== []) {
        return (
            <div style={{padding: 24, background: '#fff', minHeight: '80vh'}}>
                <Space direction="vertical" style={{width: '100%'}}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title={`今日统计 - ${moment().format('YYYY年MM月DD日')}`} bordered={false}>
                                <Statistic title="本日盈利额" value={Number(todayRevenue).toFixed(2)}/>
                                <Statistic title="本日就诊人次" value={todayTransactions}/>
                                <Statistic title="本日提成" value={Number(todayCommission).toFixed(2)}/>
                                <Statistic title="本日利润" value={Number(todayProfit).toFixed(2)}/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="本月统计" bordered={false}>
                                <Statistic title="本月盈利额" value={Number(monthRevenue).toFixed(2)}/>
                                <Statistic title="本月就诊人次" value={monthTransactions}/>
                                <Statistic title="本月提成" value={Number(monthCommission).toFixed(2)}/>
                                <Statistic title="本月利润" value={Number(monthProfit).toFixed(2)}/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="总计" bordered={false}>
                                <Statistic title="总盈利额" value={Number(totalRevenue).toFixed(2)}/>
                                <Statistic title="总就诊人次" value={totalTransactions}/>
                                <Statistic title="总提成" value={Number(totalCommission).toFixed(2)}/>
                                <Statistic title="总利润" value={Number(totalProfit).toFixed(2)}/>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="营业额" bordered={false}>
                                <LineChart width={730} height={250} data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Line type="monotone" name={"营业额"} dataKey="Revenue" stroke="#8884d8"
                                          activeDot={{r: 8}}/>
                                </LineChart>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="交易量" bordered={false}>
                                <BarChart width={730} height={250} data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar name="就诊人次" dataKey="Transactions" fill="#82ca9d"/>
                                </BarChart>
                            </Card>
                        </Col>
                    </Row>
                </Space>
            </div>
        );
    }
    ;
}

export default Dashboard;