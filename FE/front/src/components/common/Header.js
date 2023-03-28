import { useNavigate } from 'react-router-dom';
import style from './Header.module.css';

import smallLogo from '../../assets/smallLogo.png';
import isLogin from './isLogin';
import LogoutBtn from './LogoutBtn';

function Header() {
	const loginState = isLogin();
	const navigate = useNavigate();

	const handleClick=()=>{
		navigate('/login')
	}

	return (
		<>
			<div className={style.header}>
				<div className={style.box}>
					<img src={smallLogo} className={style.AppLogo} alt='logo' />
					{loginState ? (<LogoutBtn />) : 
					<button className={style.loginText} onClick={handleClick}>로그인</button>
					}
				</div>
			</div>
		</>
	);
}

export default Header;
