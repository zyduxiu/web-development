import{createSlice} from "@reduxjs/toolkit";

const counterStore=createSlice({
    name:'counter',
    initialState:{
        count:0
    },//初始化state；
    reducers:{
        increment(state){
            state.count++
        },
        decrement(state){
            state.count--
        }
    }//修改数据的方法，支持直接修改
})

const {increment,decrement}=counterStore.actions
//获取actions
const reducer=counterStore.reducer
//获取reducer

export {increment,decrement}
export default reducer