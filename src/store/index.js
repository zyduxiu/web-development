import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./modules/counterstore"

const store=configureStore({
    reducer:{
        counter:counterReducer
    }
})

export default store