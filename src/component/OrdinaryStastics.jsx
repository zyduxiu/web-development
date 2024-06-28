import React, { useEffect, useState, useRef } from 'react';
import {Card, Col, DatePicker, Row, Space, Statistic, Table} from 'antd';
import { getBookStastic } from "../services/getBookStastic";
import * as echarts from 'echarts';
import {getStastic} from "../services/getStastic";
import Column from "antd/es/table/Column";

const { RangePicker } = DatePicker;

export default function BookStastics() {
    const [stastics, setStastics] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchStastics = async () => {
            const information = {
                startdate: null,
                enddate: null,
            };

            if (selectedDates[0] && selectedDates[1]) {
                information.startdate = selectedDates[0].toISOString();
                information.enddate = selectedDates[1].toISOString();
            }

            const data = await getStastic(information);
            if(data.bookInfoList!==null) {
                data.bookInfoList.sort((a, b) => b.second - a.second);
            }
            setStastics(data);
        };

        fetchStastics();
    }, [selectedDates]);

    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(chartRef.current);

        // 指定图表的配置项和数据
        const option = {
            tooltip: {
                trigger: 'item'
            },

            series: [
                {
                    name: 'Sales',
                    type: 'pie',
                    radius: '50%',
                    data: stastics?.bookInfoList?.map(item => ({
                        value: item.second,
                        name: item.first
                    })) || [],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        // 组件卸载时销毁图表
        return () => myChart.dispose();
    }, [stastics]);

    const onDateChange = (dates) => {
        if (dates) {
            setSelectedDates(dates);
            console.log('选中的开始日期:', dates[0]);
            console.log('选中的结束日期:', dates[1]);
        } else {
            setSelectedDates([]);
            console.log('日期被清除');
        }
    };


        return (

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <div>
                        <b style={{fontSize: '2rem'}}>Book</b>
                        <b style={{fontSize: '2rem', paddingLeft: '1%'}}>Stastic</b>
                    </div>
                    <RangePicker style={{marginTop: '0.23%'}} onChange={onDateChange}/>
                </div>
                <Card style={{width: '100%'}}>
                    <Row justify="space-around" align="top" style={{marginTop: '2%'}}>
                        <Col span={12}>
                            <div style={{position: 'relative', width: 400, height: 400}} ref={chartRef}></div>
                            {/* 图表下方放置的统计信息 */}
                            <div style={{marginTop: '20px',marginLeft:'17%'}}>
                                <Space direction="" size="large">
                                    <Statistic title="购书总数" value={stastics?.totalbooks} suffix="本"/>
                                    <Statistic title="购书总额" value={stastics?.totalprice / 100} suffix="元"/>
                                </Space>
                            </div>
                        </Col>
                        <Col span={12}>
                            {stastics !== null && (
                                <Table dataSource={stastics.bookInfoList} style={{marginTop: '2%'}}>
                                    <Column title="Book" dataIndex="first" key="first"/>
                                    <Column title="Total amount" dataIndex="second" key="second"/>
                                </Table>
                            )}
                        </Col>
                    </Row>
                </Card>
            </div>
        );

}
