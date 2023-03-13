import React from 'react';
import styles from '../JH/Login.module.css';
import SubLogo from '../../assets/SubLogo.png';
import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav';

const Login = () => {
	return (
		<main className={styles.Main}>
			<Header2>로그인</Header2>
			<div className={styles.Contents}>
				<img src={SubLogo} alt='서브 로고' />
			</div>
			<div className={styles.LoginInput}>
				<div>
					<input type='id' placeholder='이메일 주소'></input>
				</div>
				<div>
					<input type='password' placeholder='비밀번호' />
				</div>
			</div>
			<div className={styles.button}>
				<button>로그인</button>
			</div>
			<div className={styles.SignUp}>
				회원이 아니신가요? <span>회원가입</span>
			</div>
			<Nav />
		</main>
	);
};

export default Login;
