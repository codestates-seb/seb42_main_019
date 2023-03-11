import './Header.css';
import smallLogo from '../../assets/smallLogo.png';

function Header() {
	return (
		<>
			<div className='box'>
				<img src={smallLogo} className='App-logo' alt='logo' />
				<div className='login-text'>로그인</div>
			</div>
		</>
	);
}

export default Header;
