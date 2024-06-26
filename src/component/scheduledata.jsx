// scheduleData.js

const doctors = ['张医生', '王医生', '李医生']; // 医生列表
const timeSlots = ['9:00-10:00', '10:00-11:00', '11:00-12:00']; // 时间槽列表

// 假设的预约数据，实际情况下可能从API获取
const appointments = [
    { doctor: '张医生', time: '9:00-10:00', appointment: '张三' },
    { doctor: '王医生', time: '10:00-11:00', appointment: '李四' },
    // ...其他预约数据
];

// 根据医生和时间槽组织数据
const scheduleData = doctors.map(doctor => {
    return timeSlots.map(timeSlot => {
        // 查找当前医生和时间槽的预约
        const appointment = appointments.find(
            app => app.doctor === doctor && app.time === timeSlot
        );
        return { doctor, time: timeSlot, appointment: appointment ? appointment.appointment : null };
    });
});

export default scheduleData;