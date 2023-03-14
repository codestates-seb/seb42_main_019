import React from 'react';
import styles from '../JH/Login.module.css';
import SubLogo from '../../assets/SubLogo.png';
import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav';
import { UserIcon, PasswordIcon } from '../../components/IJH/LoginIcon';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<main className={styles.Main}>
			<Header2>로그인</Header2>
			<div className={styles.Contents}>
				<img src={SubLogo} alt='서브 로고' />
			</div>
			<div className={styles.LoginInput}>
				<div className={styles.Input}>
					<UserIcon />
					<input type='id' placeholder='이메일 주소'></input>
				</div>
				<div className={styles.Input}>
					<PasswordIcon />
					<input type='password' placeholder='비밀번호' />
				</div>
			</div>
			<div className={styles.button}>
				<button>
					<Link to={'/login'}>로그인</Link>
				</button>
			</div>
			<div className={styles.SignUp}>
				회원이 아니신가요?{' '}
				<span>
					<Link className={styles.Link} to={'/signup'}>
						회원가입
					</Link>
				</span>
			</div>
			<Nav />
		</main>
	);
};

export default Login;
