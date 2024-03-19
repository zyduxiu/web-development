import {createSlice} from "@reduxjs/toolkit";

const channelstore=createSlice({
        name: 'channel',
        initialState:{
            channelList:[]
        },
        reducers:{
            setChannels(state,action){
                state.channelList=action.payload
            }
        }
})
//异步请求：
const {setChannels}=channelstore.actions
const fetchChannelList=()=>{//用dispatch修改state
    return async (dispatch)=>{

    }
}