import React, { useEffect, useState, useRef } from 'react';
import {Card, Col, DatePicker, Row, Space, Statistic, Table,Radio} from 'antd';
import { getUserStastic } from "../services/getUserStastic";
import * as echarts from 'echarts';
import chroma from 'chroma-js';
import Column from "antd/es/table/Column";
import {getUserBookStastic} from "../services/getUserBookStastic";
const { RangePicker } = DatePicker;

export default function UserStastics() {
    const [stastics, setStastics] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const [flag,setFlag]=useState(false);
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
            const data2=await getUserBookStastic(information);
            const data = await getUserStastic(information);
            console.log(data);
            console.log(data2);
            if(data.bookInfoList!==null) {
                // 对数据进行排序
                data.bookInfoList.sort((a, b) => b.second - a.second);
            }
            let result=[];
            if(data.bookInfoList!==null&&data2.bookInfoList!==null) {
                data.bookInfoList.map(amount => {
                    data2.bookInfoList.map(book => {
                            if (book.first === amount.first) {
                                const tmp = {
                                    name: book.first,
                                    second: book.second,
                                    third: amount.second/100,
                                }
                                result.push(tmp);
                            }
                        }
                    )
                })
                console.log("here1")
                setStastics(result);
            }
            else{
                setStastics(null);
            }
            setFlag(false);
            console.log(result);

        };

        fetchStastics();
    }, [selectedDates]);


    console.log(flag);
    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(chartRef.current);

        // 指定图表的配置项和数据
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['总额','数量']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: stastics?.slice(0, 10).map(item => item.name) || [],
                boundaryGap: true
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: flag?'数量':'总额',
                    type: 'bar',
                    data: flag ? stastics?.slice(0, 10).map(item => item.second) || [] : stastics?.slice(0, 10).map(item => item.third) || [],
                    itemStyle: {
                        color: function (params) {
                            return chroma.scale(['#ff6384', '#36a2eb', '#cc65fe']).mode('lch').colors(stastics?.length)[params.dataIndex];
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);

        return () => myChart.dispose();
    }, [stastics]);

    const handleChange=()=>{
        if(stastics) {
            let sortedStastics = [...stastics]; // 创建一个新的数组副本
            if (flag === false) {
                sortedStastics.sort((a, b) => b.second - a.second);
            }
            if (flag === true) {
                sortedStastics.sort((a, b) => b.third - a.third);
            }
            setStastics(sortedStastics); // 设置新的状态
            setFlag(!flag); // 切换flag的值
        }
    }


  //  console.log(stastics);
    useEffect(() => {

    }, [flag]);
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

    console.log(stastics)
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <div>
                    <b style={{fontSize: '2rem'}}>User</b>
                    <b style={{fontSize: '2rem', paddingLeft: '1%'}}>Stastic</b>
                </div>
                <RangePicker style={{marginTop: '0.23%'}} onChange={onDateChange}/>
            </div>

            <Card style={{width: '100%'}}>
                <Row justify="space-around" align="top" style={{marginTop: '2%'}}>
                    <Col span={12}>
                        <div style={{position: 'relative', width: 600, height: 500}} ref={chartRef}></div>
                    </Col>
                    <Col span={12}>
                        <Radio.Group value={flag?"b":"a"}
                                     onChange={handleChange}
                                     style={{
                            marginLeft:'25%'
                        }}>
                            <Radio.Button value="a">根据金额排序</Radio.Button>
                            <Radio.Button value="b">根据数量排序</Radio.Button>
                        </Radio.Group>

                            <Table dataSource={stastics} style={{marginTop: '2%'}}>
                                <Column title="User" dataIndex="name" key="name"/>
                                <Column title="Total Amount" dataIndex="second" key="second"/>
                                <Column title="Total Price" dataIndex="third" key="third"/>
                                {/* 根据实际数据结构添加更多的列 */}
                            </Table>

                    </Col>
                </Row>
            </Card>
        </div>
    );
}
