import React from 'react';
import { ConfigProvider, DatePicker, Button } from 'antd';
import moment from 'moment';
import locale from 'antd/locale/zh_CN';
const { RangePicker } = DatePicker;


const MyDatePicker =({onChange}) =>{
    const setThisYear = () => {
        const startOfYear = moment().startOf('year');
        const endOfYear = moment().endOf('year');
        onChange([startOfYear, endOfYear]);
    };

    const setThisMonth = () => {
        const startOfMonth = moment().startOf('month');
        const endOfMonth = moment().endOf('month');
        onChange([startOfMonth, endOfMonth]);
    };

    const setToday = () => {
        const today = moment();
        onChange([today, today]);
    };

    return (

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={setThisYear}>今年</Button>
                <Button onClick={setThisMonth}>本月</Button>
                <Button onClick={setToday}>本日</Button>
                <ConfigProvider locale={locale}>
                <RangePicker onChange={onChange} />
                </ConfigProvider>
            </div>

    );
}

export default MyDatePicker;