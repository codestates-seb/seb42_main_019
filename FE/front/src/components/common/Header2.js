import style from './Header2.module.css';
import btnBack from '../../assets/btnBack.png';
import { useNavigate } from 'react-router-dom';

const Header2 = ({children})=> {

	const navigate = useNavigate();

	return (
		<>
			<div className={style.box2}>
				<button className={style.backBtn} onClick={()=>{navigate(-1)}}>
				<img src={btnBack} className={style.AppBtnback} alt='btnback' />
				</button>
				<span className={style.loginText2}>{children}</span>
				<span className={style.loginText3}>로그인</span>
			</div>
		</>
	);
}

export default Header2;
