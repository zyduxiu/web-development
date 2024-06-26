// components/DoctorPerformance.js
import React, {useEffect, useState} from 'react';
import { BarChart, Bar, PieChart, Pie, Tooltip, Cell, Legend, XAxis, YAxis, CartesianGrid } from 'recharts';
import {Button, Card, Divider, Table} from 'antd';
import MyDatePicker from "../CustomDatePicker";
import {startOfDay} from "date-fns";

import * as XLSX from 'xlsx';
import getAllAppointments from "../../Service/getAllAppointments";
import getTypes from "../../Service/GetTypes";
import getDoctors from "../../Service/getDoctors";

const DoctorPerformance = ({  }) => {
    // 状态管理选定的日期范围
    const [dates, setDates] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [data,setData]=useState([]);

    // 日期范围改变时的处理函数

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
                        paymentMethod: "会员卡扣费"
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
                    let formattedDate2 = Date2.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                    console.log(formattedDate);
                    tmp.chargeDate=formattedDate2;
                    results.push(tmp);
                })
                console.log(results);
                setData(results);
                setFilteredData(results)
            };

            initialize();
        }
        , [])

    async function initialize() {
        let datax = await getDoctors();
        setData(data);
    };
    const handleDateChange = (dates) => {
        setDates(dates);
        filterDataByDateRange(dates);
    };

    const filterDataByDateRange = (dates) => {
        if (!dates || dates.length === 0) {
            setFilteredData(data);
            return;
        }

        const [start, end] = dates;
        const filtered = data.filter(d => {
            const dateOnly = startOfDay(new Date(d.chargeDate));
            return dateOnly >= start && dateOnly <= end;
        });

        setFilteredData(filtered);
    };

    // 整理数据
    const doctorStats = filteredData.reduce((acc, cur) => {
        if (!acc[cur.doctor]) {
            acc[cur.doctor] = {
                totalIncome: 0,
                serviceCount: 0
            };
        }
        acc[cur.doctor].totalIncome += cur.actualPrice;
        acc[cur.doctor].serviceCount += 1;
        return acc;
    }, {});

    const doctorData = Object.keys(doctorStats).map(key => ({
        name: key,
        totalIncome: doctorStats[key].totalIncome,
        serviceCount: doctorStats[key].serviceCount,
        efficiency: doctorStats[key].totalIncome / doctorStats[key].serviceCount
    }));

    // 排序医生数据以展示收入和效率排名
    const incomeSorted = [...doctorData].sort((a, b) => b.totalIncome - a.totalIncome);
    const efficiencySorted = [...doctorData].sort((a, b) => b.efficiency - a.efficiency);


    const columns = [
        {
            title: '收费日期',
            dataIndex: 'chargeDate',
            key: 'chargeDate',
        },
        {
            title: '医生姓名',
            dataIndex: 'doctor',
            key: 'doctor',
        },
        {
            title: '患者姓名',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: '项目类型',
            dataIndex: 'itemType',
            key: 'itemType',
        },
        {
            title: '项目单价',
            dataIndex: 'originalPrice',
            key: 'originalPrice',
        },
        {
            title: '提成',
            dataIndex: 'commission',
            key: 'commission',
        }
    ];


    const exportToExcel = (csvData, fileName) => {
        // 创建一个新的工作簿
        const workbook = XLSX.utils.book_new();
        // 将数据转换为工作表
        const worksheet = XLSX.utils.json_to_sheet(csvData);
        // 将工作表添加到工作簿
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        // 导出工作簿
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    if(data!==[]) {
        return (
            <div>
                <MyDatePicker onChange={handleDateChange}/>
                <Card title="详细数据表格" style={{height: '500px', overflow: 'auto', position: 'relative'}}>
                    <Table dataSource={filteredData} columns={columns} pagination={{pageSize: 5}}/>
                    <div style={{position: 'absolute', bottom: 10, left: 40}}>
                        <Button onClick={() => exportToExcel(filteredData, "ExportedData")}>
                            导出为 Excel
                        </Button>
                    </div>
                </Card>
                <Divider/>
                <div style={{
                    display: 'flex',
                    'justify-content': 'space-between',
                    'align-items': 'flex-start',
                }}>
                    <Card title="医生收入排名">
                        <BarChart width={500} height={300} data={incomeSorted}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="totalIncome" fill="#8884d8"/>
                        </BarChart>
                    </Card>
                    <Card title="服务次数统计">
                        <PieChart width={400} height={300}>
                            <Pie data={doctorData} dataKey="serviceCount" nameKey="name" cx="50%" cy="50%"
                                 outerRadius={120} fill="#82ca9d">
                                {doctorData.map((entry, index) => (
                                    <Cell key={`cell-${index}`}
                                          fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]}/>
                                ))}
                            </Pie>
                            <Tooltip/>
                            <Legend/>
                        </PieChart>
                    </Card>
                    <Card title="医生客单价排名">
                        <BarChart width={500} height={300} data={efficiencySorted}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="efficiency" fill="#82ca9d"/>
                        </BarChart>
                    </Card>
                </div>
            </div>
        );
    }
};

export default DoctorPerformance;