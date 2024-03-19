import { createBrowserRouter } from "react-router-dom";
import Homepage from "../page/home";
import Loginpage from "../page/login";
import Bookpage from "../page/book";
import Cartpage from "../page/cart";
import Profilepage from "../page/profile";
import Orderpage from "../page/order";

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
        element: <Homepage/>
    },
    {
        path:'/book/:id',
        element: <Bookpage />
    },
    {
        path: '/order',
        element: <Orderpage/>
    },
    {
        path: '/cart',
        element: <Cartpage/>
    },
    {
        path:'/profile',
        element: <Profilepage/>
    }
])

export default router
