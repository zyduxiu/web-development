import { createBrowserRouter } from "react-router-dom";
import Homepage from "../page/home";
import Loginpage from "../page/login";
import Bookpage from "../page/book";
import Cartpage from "../page/cart";
import Profilepage from "../page/profile";
import Orderpage from "../page/order";
import Managepage from "../page/stastic";
import Stasticpage from "../page/stastic";
import BookManagepage from "../page/bookmanage";
import RegisterManagepage from "../page/registermanage";
import OrderManagePage from "../page/ordermanagepage";
import BookStasticPage from "../page/BookStasticPage";
import UserStasticPage from "../page/UserStasticPage";
import PrivateRoute from "./privaterouter";

const router = createBrowserRouter([
    {
        path:'',
        element: <Loginpage/>
    },
    {
        path:'/login',
        element:<Loginpage/>
    },
    {
        path:'/home',
        element: <PrivateRoute element={<Homepage />} />
    },
    {
        path:'/book/:id',
        element: <PrivateRoute element={<Bookpage />} />
    },
    {
        path: '/order',
        element: <PrivateRoute element={<Orderpage />} />
    },
    {
        path: '/cart',
        element: <PrivateRoute element={<Cartpage />} />
    },
    {
        path:'/profile',
        element: <PrivateRoute element={<Profilepage />} />
    },
    {
        path:'/manage/statistic',
        element: <PrivateRoute element={<Stasticpage />} />
    },
    {
        path:'/manage/book',
        element: <PrivateRoute element={<BookManagepage element={0}/>} userTypeRequired={1} />
    },
    {
        path:'/manage/register',
        element: <PrivateRoute element={<RegisterManagepage element={0}/>} userTypeRequired={1} />
    },
    {
        path:'/manage/order',
        element:  <PrivateRoute element={<OrderManagePage element={0}/>} userTypeRequired={1} />
    },
    {
        path: '/stastic/book',
        element: <PrivateRoute element={<BookStasticPage element={0}/>} userTypeRequired={1} />
    },
    {
        path: '/stastic/user',
        element:<PrivateRoute element={<UserStasticPage element={0}/>} userTypeRequired={1} />
    }


])

export default router
