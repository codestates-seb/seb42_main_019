import './Header.css';
import btnBack from '../../assets/btnBack.png';

function Header() {
	return (
		<>
			<div className='box2'>
				<img src={btnBack} className='App-btnback' alt='btnback' />
				<span className='login-text2'>로그인</span>
				<span className='login-text3'>로그인</span>
			</div>
		</>
	);
}

export default Header;
