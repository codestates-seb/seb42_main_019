import React from 'react';
import styles from '../JH/Login.module.css';
import SubLogo from '../../assets/SubLogo.png';

const Login = () => {
	return (
		<>
			<div className={styles.Contents}>
				<img src={SubLogo} alt='서브 로고' />
			</div>
			<div className={styles.LoginInput}>
				<div>
					<input type='id' placeholder='이메일 주소' />
				</div>
				<div>
					<input type='password' placeholder='비밀번호' />
				</div>
			</div>
			<button>로그인</button>
			<div className={styles.SignUp}>
				회원이 아니신가요? <span>회원가입</span>
			</div>
		</>
	);
};

export default Login;
