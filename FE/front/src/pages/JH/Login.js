import React, { useState } from 'react';
import styles from '../JH/Login.module.css';
import HomeImg from '../../assets/homeImg.png';
import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav';
import { UserIcon, PasswordIcon } from '../../components/IJH/LoginIcon';
import { Link } from 'react-router-dom';

const User = {
	email: 'test@gmail.com',
	pw: 'test2323!',
};

const Login = () => {
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');

	const [emailValid, setEmailValid] = useState(false);
	const [pwValid, setPwValid] = useState(false);

	const handleEmail = (event) => {
		setEmail(event.target.value);
		const regex =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		if (regex.test(event.target.value)) {
			setEmailValid(true);
		} else {
			setEmailValid(false);
		}
	};

	const handlePassword = (event) => {
		setPw(event.target.value);
		const regex =
			/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
		if (regex.test(event.target.value)) {
			setPwValid(true);
		} else {
			setPwValid(false);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const onClickConfirmButton = () => {
		if (email === User.email && pw === User.pw) {
			alert('로그인에 성공했습니다.');
		} else {
			alert('등록되지 않은 회원입니다.');
		}
	};

	return (
		<main className={styles.Main}>
			<Header2>로그인</Header2>
			<div className={styles.Contents}>
				<img src={HomeImg} alt='서브 로고' />
			</div>
			<div className={styles.LoginInput} onSubmit={handleSubmit}>
				<div className={styles.Input}>
					<UserIcon />
					<input
						type='text'
						value={email}
						onChange={handleEmail}
						required
						placeholder='이메일 주소'
					></input>
				</div>
				<div className={styles.errorMessage}>
					{!emailValid && email.length > 0 && (
						<div>올바른 이메일을 입력해주세요.</div>
					)}
				</div>
				<div className={styles.Input}>
					<PasswordIcon />
					<input
						type='password'
						value={pw}
						onChange={handlePassword}
						placeholder='비밀번호'
					/>
				</div>
				<div className={styles.errorMessage}>
					{!pwValid && pw.length > 0 && (
						<div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
					)}
				</div>
				<div onClick={onClickConfirmButton} className={styles.Button}>
					<button>로그인</button>
				</div>
			</div>
			<div className={styles.SignUp}>
				회원이 아니신가요?{' '}
				<span>
					<Link className={styles.Link} to={'/signUp'}>
						회원가입
					</Link>
				</span>
			</div>
			<Nav />
		</main>
	);
};

export default Login;
