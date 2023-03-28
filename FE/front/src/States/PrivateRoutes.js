import { Navigate, Outlet } from "react-router-dom"
import isLogin from "../components/common/isLogin"
import MyPage from "../pages/SB/MyPage";


const PrivateRoutes =()=>{
    const loginState = isLogin();

    return loginState ? (
        
        <div>
        <Outlet>
        <MyPage/>
        </Outlet>
        </div>

    ) : <Navigate to="/login" />
}

export default PrivateRoutes