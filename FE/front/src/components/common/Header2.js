import style from './Header.module.css';
import btnBack from '../../assets/btnBack.png';

function Header() {
	return (
		<>
			<div className={style.box2}>
				<img src={btnBack} className={style.AppBtnback} alt='btnback' />
				<span className={style.loginText2}>로그인</span>
				<span className={style.loginText3}>로그인</span>
			</div>
		</>
	);
}

export default Header;
