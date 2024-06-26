export let clients = [
    {
        key: '1',
            name: '小张',
            gender: '男',
            age: 28,
            phoneNumber:18777618903,
            doctor: '李医生',
            amount: '¥200.00',
            isMember: true,
            cards:[
                {   cardName:'金卡',
                    cardType: '折扣卡',
                    cardNumber: '1234567890',
                    cardBalance:'7500.00',
                    cardDiscount: '7折',
                },
                {   cardName:'10次爱心体检卡',
                    cardType: '计次卡',
                    cardNumber: '133',
                    cardValue:'10',
                    cardDiscount: '次卡',
                },
            ],

            visitRecords: [
                { key: '1', date:'2024-03-01',doctor:'李老师',amount:'270.00'},
                { key: '2', date:'2024-03-01',doctor:'李老师',amount:'270.00'},
                { key: '3', date:'2024-03-01',doctor:'李老师',amount:'270.00'},
            ],
        },
        {
            key: '2',
            name: '小李',
            gender: '女',
            age: 32,
            phoneNumber:15466980731,
            doctor: '王医生',
            amount: '¥350.00',
            isMember: true,
            cards: [
                {
                    cardName: '银卡',
                    cardType: '折扣卡',
                    cardNumber: '9876543210',
                    cardBalance: '5000.00',
                    cardDiscount: '7折'
                },
                {
                    cardName: '5次健康体检卡',
                    cardType: '计次卡',
                    cardNumber: '234',
                    cardValue: 5,
                    cardDiscount: '次卡'
                }
            ],
            visitRecords: [
                { key: 1, date: '2024-03-15', doctor: '王医生', amount: 310.00 },
                { key: 2, date: '2024-03-18', doctor: '王医生', amount: 300.00 }
            ]
        },
        {
            key: '3',
            name: '小刘',
            gender: '男',
            age: 45,
            phoneNumber:13011098854,
            doctor: '陈医生',
            amount: '¥0.00',
            isMember: true,
            cards: [
                {
                    cardName:"无卡"
                }],
            visitRecords: []
        }
]
export default clients;
