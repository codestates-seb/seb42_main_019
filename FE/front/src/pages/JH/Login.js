import React, { useState } from 'react';
import styles from '../JH/Login.module.css';
import HomeImg from '../../assets/homeImg.png';
import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav';
import { UserIcon, PasswordIcon } from '../../components/IJH/LoginIcon';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [emailValid, setEmailValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);

	const navigate = useNavigate();

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
		setPassword(event.target.value);
		const regex =
			/^(?=.*[a-zA-z])(?=.*[0-9])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
		if (regex.test(event.target.value)) {
			setPasswordValid(true);
		} else {
			setPasswordValid(false);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const onClickConfirmButton = () => {
		if (email === '' || password === '') {
			alert('아이디와 비밀번호를 입력해주세요.');
			return;
		}
		if (password === '') {
			alert('비밀번호를 입력해주세요.');
			return;
		}
	};

	// const handleLogin = () => {
	// 	console.log({ email, password });

	// 	const headers = {
	// 		'Content-Type': 'application/json',
	// 		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	// 	};

	// 	axios
	// 		.post(
	// 			`${process.env.REACT_APP_API_URL}/login`,
	// 			{
	// 				username: email,
	// 				password: password,
	// 			},
	// 			{
	// 				headers: headers,
	// 			},
	// 		)
	// 		.then((response) => {
	// 			console.log(response);
	// 			alert('회원가입이 완료되었습니다.');
	// 			localStorage.setItem('accessToken', response.data.token);
	// 			navigate('/');
	// 		})
	// 		.catch((error) => {
	// 			alert('등록되지 않은 회원입니다.');
	// 			console.log(error.response);
	// 		});
	// };

	async function handleLogin() {
		try {
			const response = await axios({
				method: 'post',
				url: 'http://ec2-3-35-22-107.ap-northeast-2.compute.amazonaws.com:8080/login',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
					'Content-Type': 'application/json',
				},
				data: {
					username: email,
					password: password,
				},
			});
			console.log(response.data);
			localStorage.setItem('accessToken', response.data.token);
			alert('로그인 성공');
			navigate('/');
		} catch (error) {
			console.error(error);
			alert('정보를 확인해주세요');
		}
	}

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
						value={password}
						onChange={handlePassword}
						placeholder='비밀번호'
					/>
				</div>
				<div className={styles.errorMessage}>
					{!passwordValid && password.length > 0 && (
						<div>영문,숫자 조합 8~20자로 입력해주세요.</div>
					)}
				</div>
				<div
					onClick={() => {
						onClickConfirmButton();
						handleLogin();
					}}
					className={styles.Button}
				>
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
