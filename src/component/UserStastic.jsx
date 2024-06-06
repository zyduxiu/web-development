import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import {ArcElement, Chart, registerables,CategoryScale,LinearScale,BarElement} from 'chart.js';
import {Bar, Pie,} from 'react-chartjs-2';
import {getStastic} from "../services/getStastic";
import chroma from 'chroma-js';
import {getBookStastic} from "../services/getBookStastic";
import {getUserStastic} from "../services/getUserStastic";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const numDataPoints = 10;
const colors = chroma.scale(['#ff6384', '#36a2eb', '#cc65fe']).mode('lch').colors(numDataPoints);
export default function UserStastics() {
   Chart.register(CategoryScale,LinearScale,BarElement)
    const [stastics, setStastics] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const [num,setNum]=useState([]);
    const [labels,setLabels]=useState([]);
    useEffect(() => {
        const fetchStastics = async () => {
            const information = {
                startdate:null,
                enddate:null,
            };
            if (selectedDates[0] && selectedDates[1]) {
                information.startdate = selectedDates[0].toISOString();
                information.enddate = selectedDates[1].toISOString();
            }
            else {
                information.startdate=null;
                information.enddate=null;
            }
            console.log("here");
            const data = await getUserStastic(information);
            setStastics(data);
            data.bookInfoList?setNum(data.bookInfoList.map(book=>book.second)):setNum(null);
            data.bookInfoList?setLabels(data.bookInfoList.map(book=>book.first)):setLabels(null);
        };

        fetchStastics();
    }, [selectedDates]); // 依赖项正确设置

    const defaultData = {
        labels: ['无购书记录'],
        datasets: [
            {
                label: '无购书',
                data: [0], // 默认数据点
                backgroundColor: '#ddd', // 默认背景颜色
            }
        ]
    };
    const generateData = (bookInfoList) => {
        if(num.length===0){
            return defaultData;
        }
        const data = {
            labels: labels, // 饼图的每个部分的标签
            datasets: [
                {
                    data: num,
                    backgroundColor:chroma.scale(['#ff6384', '#36a2eb', '#cc65fe']).mode('lch').colors(num.length), // 每个部分的背景颜色

                }
            ]
        };
        return data;
    };




    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    title: (context) => {
                        // 返回当前数据点的标签
                        return context[0].label;
                    },
                    label: (context) => {
                        // 返回当前数据点的值
                        return `数量: ${context.parsed.y}`;
                    }
                }
            },
            // legend: {
            //     position: 'top',
            // },
        }
    };


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
    if(stastics!==null) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <b style={{
                        fontSize: '2rem',
                        paddingLeft: '1%'
                    }}>User</b>
                    <b style={{
                        fontSize: '2rem',
                        paddingLeft: '1%'
                    }}>Stastic</b>
                    <RangePicker style={{
                        marginLeft: '55%',
                        marginTop: '0.23%'
                    }} onChange={onDateChange}/>
                </div>
                {stastics && (
                    <div>
                        <Bar data={stastics.bookInfoList ? generateData(stastics.bookInfoList) : defaultData}
                             options={options} style={{
                            width: "40%",
                            height: "40%",
                        }} />
                    </div>
                )}
            </div>
        );
    }
}
