import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../componets/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Error from "../pages/Error";
import Dashboard from "../componets/Dashboard";
import ShorterlinkBuyPage from "../componets/ShorterlinkBuyPage";
import Admin from "../componets/Admin";
import User from "../pages/User";
import Link from "../pages/Link";
import Withdraw from "../pages/Withdraw";
import EditDelete from "../pages/EditDelete";
import Wallet from "../componets/Wallet";
import Buy from "../componets/Buy";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";

const router= createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"*",
                element:<Error/>
            },
            {
                path:"wallet",
                element:<Wallet/>
            },
            {
                path:"buy",
                element:<Buy/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"sign-up",
                element:<SignUp/>
            },               
            {
                path:"forget-password",
                element:<ForgetPassword/>
            },               
            {
                path:"reset-password",
                element:<ResetPassword/>
            },               
            {
                path:"/shorter/:id",
                element:<ShorterlinkBuyPage/>
            },               
            {
                path:"dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path:"admin/:page",
                        element:<Admin/>
                    },
                    {
                        path:"user/:page",
                        element:<User/>
                    },
                    {
                        path:"link/:page",
                        element:<Link/>
                    },
                    {
                        path:"withdraw",
                        element:<Withdraw/>
                    },
                    {
                        path:"edit/:page",
                        element:<EditDelete/>
                    },
                ]
            },
        ]
    }
])

export default router