import React, {useEffect, useState} from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, Legend, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from 'recharts';
import { Radio, Card, DatePicker, ConfigProvider, Empty, Table, Button } from 'antd';
import { startOfDay } from 'date-fns';

import locale from 'antd/locale/zh_CN';

import MyDatePicker from "../CustomDatePicker";

import * as XLSX from 'xlsx';
import getAllAppointments from "../../Service/getAllAppointments";
import getTypes from "../../Service/GetTypes";
import getDoctors from "../../Service/getDoctors";

const { RangePicker } = DatePicker;

const TransactionAnalysis = () => {
    const [dates, setDates] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState(data);

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

    const handleDateChange = (dates) => {
        setDates(dates);
        filterDataByDateRange(dates);
    };

    const filterDataByDateRange = (dates) => {
        if (!dates || dates.length === 0) {
            setFilteredTransactions(data);
            return;
        }

        const [start, end] = dates;
        const filtered = data.filter(tran => {
            const dateOnly = startOfDay(new Date(tran.date));
            return dateOnly >= start && dateOnly <= end;
        });

        setFilteredTransactions(filtered);
    };

    const columns = [
        {
            title: '交易日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '交易类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: '操作员',
            dataIndex: 'operator',
            key: 'operator',
        }
    ];

    const exportToExcel = (csvData, fileName) => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(csvData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    const transactionByType = filteredTransactions.reduce((acc, tran) => {
        const key = tran.type;
        if (!acc[key]) acc[key] = { count: 0, amount: 0 };
        acc[key].count += 1;
        acc[key].amount += tran.amount;
        return acc;
    }, {});

    const transactionData = Object.keys(transactionByType).map(key => ({
        name: key,
        count: transactionByType[key].count,
        amount: transactionByType[key].amount
    }));

    const renderBarChart = (data) => (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="交易次数" />
                <Bar dataKey="amount" fill="#82ca9d" name="交易金额" />
            </BarChart>
        </ResponsiveContainer>
    );
    if(data!==[]){
    return (
        <div>
            <ConfigProvider locale={locale}>
                <RangePicker onChange={handleDateChange} />
            </ConfigProvider>
            <Card title="交易详情表" style={{ height: '500px', overflow: 'auto' }}>
                <Table dataSource={filteredTransactions} columns={columns} pagination={{ pageSize: 5 }} />
                <div style={{ position: 'absolute', bottom: 10, left: 40 }}>
                    <Button onClick={() => exportToExcel(filteredTransactions, "ExportedData")}>
                        导出为 Excel
                    </Button>
                </div>
            </Card>
            <Card title="交易类型分析">
                {renderBarChart(transactionData)}
            </Card>
        </div>
    );
};
    }

export default TransactionAnalysis;