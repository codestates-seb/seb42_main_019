import style from './Header.module.css';
import smallLogo from '../../assets/smallLogo.png';

function Header({children}) {

	const handleClick=(e)=>{
		window.location.href = '/login'
	}

	return (
		<>
			<div className={style.header}>
				<div className={style.box}>
					<img src={smallLogo} className={style.AppLogo} alt='logo' />
					<button className={style.loginText} onClick={handleClick}>{children}</button>
				</div>
			</div>
		</>
	);
}

export default Header;
