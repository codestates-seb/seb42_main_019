import style from './Header.module.css';
import smallLogo from '../../assets/smallLogo.png';

function Header() {

	const handleClick=(e)=>{
		window.location.href = '/login'
	}

	return (
		<>
			<div className={style.notFooter}>
				<div className={style.box}>
					<img src={smallLogo} className={style.AppLogo} alt='logo' />
					<button className={style.loginText} onClick={handleClick}>로그인</button>
				</div>
			</div>
		</>
	);
}

export default Header;
