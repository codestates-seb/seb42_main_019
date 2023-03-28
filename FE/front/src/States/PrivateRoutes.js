import { Navigate, Outlet } from "react-router-dom"
import MyPage from "../pages/SB/MyPage";


const PrivateRoutes =()=>{
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('userId');
    const loginState = () => {
        return token && user
    }
    return loginState() ? (
        
        <div>
        <Outlet>
        <MyPage/>
        </Outlet>
        </div>

    ) : <Navigate to="/login" />
}

export default PrivateRoutes