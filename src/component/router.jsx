import { createBrowserRouter} from "react-router-dom";
import Login from "../Page/Sign_in";
import Main from "../Page/main"
import Profilepage from "../Page/profile";
import Cashpage from "../Page/cash";
import Statisticpage from "../Page/statistic";
import Settingpage from "../Page/settings";

import Dashboard from "./statisticChart/Dashboard";
import RevenueAnalysis from "./statisticChart/RevenueAnalysis";
import DoctorPerformance from "./statisticChart/DoctorPerformance";
import MembershipAnalysis from "./statisticChart/MembershipAnalysis";
import {cashInfo} from "../data/CashInfo";
import {membershipInfo} from "../data/MembershipInfo"

import DoctorSetting from "./settings/DoctorSetting";
import AccountDetail from "./settings/AccountDetail";
import AccountManager from "./settings/AccountManager";
import TreatmentSetting from "./settings/TreatmentSetting";
import PrivateRoute from "./privateRouter";


const router = createBrowserRouter([
    {
        path:'',
        element: <Login/>
    },
    {
        path:'login',
        element: <Login/>
    },
    {
        path:'main',
        element:<PrivateRoute element={ <Main/>}/>
    },
    {
        path:'home',
        element:<PrivateRoute element={ <Main/>}/>
    },
    {
        path:'profile',
        element:<PrivateRoute element={ <Profilepage/>}/>
    },
    {
        path:'cash',
        element:<PrivateRoute element={ <Cashpage/>}/>
    },
    {
        path:'statistic',
        element:<PrivateRoute element={ <Statisticpage/>}/>,
        children:[
            {
                path:'',
                element:<Dashboard data={cashInfo}/>
            }, // ?????
            {
                path:'dashboard',
                element:<Dashboard data={cashInfo}/>
            },
            {
                path:'revenue',
                element:<RevenueAnalysis data={cashInfo}/>
            },
            {
                path:'membership',
                element:<MembershipAnalysis data={membershipInfo}/>
            },
            {
                path:'doctor-performance',
                element:<DoctorPerformance data={cashInfo}/>
            },

        ]
    },
    {
        path:'settings',
        element:<PrivateRoute element={ <Settingpage/>}/>,
        children:[
            {
                path:'doctorSetting',
                element: <DoctorSetting />
            },
            {
                path:'',
                element: <AccountManager />
            },
            // {
            //     path:'accountDetail',
            //     element: <AccountDetail />
            // },
            {
                path:'accountManager',
                element: <AccountManager />
            },
            {
                path:'treatmentSetting',
                element: <TreatmentSetting />
            }
        ]
    },

])

export default router