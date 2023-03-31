import { useEffect, useState } from "react";


const isLogin = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLogin, setIsLogin] = useState(false);

    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('userId');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        const user = localStorage.getItem('userId')
        if(token && user) {
            setIsLogin(true);
        }else {
            setIsLogin(false)
        }
    }, [token, user])
    return isLogin;
}
export default isLogin;
