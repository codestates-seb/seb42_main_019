import style from './Header.module.css';
import smallLogo from '../../assets/smallLogo.png';

function Header() {
	return (
		<>
			<div className={style.box}>
				<img src={smallLogo} className={style.AppLogo} alt='logo' />
				<div className={style.loginText}>로그인</div>
			</div>
		</>
	);
}

export default Header;
