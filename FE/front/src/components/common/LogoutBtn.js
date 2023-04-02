/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router-dom';
import style from './Header.module.css'
import isLogin from './isLogin';

function LogoutBtn() {
  const navigate = useNavigate();

  if (!isLogin()) {
    return null;
  }

  function handleLogoutClick(){
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userName');
      window.location.reload();
      navigate('/')
  }

return (
  <div>
  <button className={style.loginText} onClick={handleLogoutClick}>로그아웃</button>
  </div>
);
}

export default LogoutBtn;
