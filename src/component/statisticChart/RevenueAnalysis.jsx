import React, {useEffect, useState} from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, Legend, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { Radio, Card, DatePicker, ConfigProvider, Empty, Table, Button } from 'antd';
import { startOfDay } from 'date-fns';

import locale from 'antd/locale/zh_CN';

import MyDatePicker from "../CustomDatePicker";

import * as XLSX from 'xlsx';
import getAllAppointments from "../../Service/getAllAppointments";
import getTypes from "../../Service/GetTypes";
import getDoctors from "../../Service/getDoctors";

const { RangePicker } = DatePicker;

const RevenueAnalysis = ( {} ) => {

    const [dates, setDates] = useState([]);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);


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

    const columns = [
        {
            title: '收费日期',
            dataIndex: 'chargeDate',
            key: 'chargeDate',
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
            title: '实收',
            dataIndex: 'actualPrice',
            key: 'actualPrice',
        },
        {
            title: '支付方式',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
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

    const incomeByItem = filteredData.reduce((acc, cur) => {
        const key = cur.itemType;
        if (!acc[key]) acc[key] = 0;
        acc[key] += cur.actualPrice;
        return acc;
    }, {});

    const incomeByPaymentMethod = filteredData.reduce((acc, cur) => {
        const key = cur.paymentMethod;
        if (!acc[key]) acc[key] = 0;
        acc[key] += cur.actualPrice;
        return acc;
    }, {});

    const incomeByItemData = Object.keys(incomeByItem).map(key => ({ name: key, value: incomeByItem[key] }));
    const incomeByPaymentMethodData = Object.keys(incomeByPaymentMethod).map(key => ({ name: key, value: incomeByPaymentMethod[key] }));

    const [timeFrame, setTimeFrame] = useState('month');

    const handleTimeFrameChange = e => {
        setTimeFrame(e.target.value);
    };

    const renderPieChart = (data, color) => {
        return data.length > 0 ? (
            <PieChart width={400} height={300}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill={color}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        ) : <Empty description="暂无数据" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />;
    };

    if(data!==[]) {
        return (
            <div>

                {/*<ConfigProvider locale={locale}>*/}
                {/*    <RangePicker onChange={handleDateChange} />*/}
                {/*</ConfigProvider>*/}
                <MyDatePicker onChange={handleDateChange}/>
                <Card title="详细数据表格" style={{height: '500px', overflow: 'auto', position: 'relative'}}>
                    <Table dataSource={filteredData} columns={columns} pagination={{pageSize: 5}}/>
                    <div style={{position: 'absolute', bottom: 10, left: 40}}>
                        <Button onClick={() => exportToExcel(filteredData, "ExportedData")}>
                            导出为 Excel
                        </Button>
                    </div>
                </Card>


                <Card title="收入分类统计">
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        {renderPieChart(incomeByItemData, '#8884d8')}
                        {renderPieChart(incomeByPaymentMethodData, '#82ca9d')}
                    </div>
                </Card>
                {/*<Card title="时间序列分析">*/}
                {/*    <Radio.Group onChange={handleTimeFrameChange} value={timeFrame}>*/}
                {/*        <Radio.Button value="day">日</Radio.Button>*/}
                {/*        <Radio.Button value="week">周</Radio.Button>*/}
                {/*        <Radio.Button value="month">月</Radio.Button>*/}
                {/*    </Radio.Group>*/}
                {/*    {filteredData.length > 0 ? (*/}
                {/*        <LineChart width={600} height={300} data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>*/}
                {/*            <XAxis dataKey="chargeDate" />*/}
                {/*            <YAxis />*/}
                {/*            <CartesianGrid strokeDasharray="3 3" />*/}
                {/*            <Tooltip />*/}
                {/*            <Legend />*/}
                {/*            <Line type="monotone" dataKey="actualPrice" stroke="#8884d8" />*/}
                {/*        </LineChart>*/}
                {/*    ) : <Empty description="暂无数据" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />}*/}
                {/*</Card>*/}
            </div>
        );
    }
};

export default RevenueAnalysis;