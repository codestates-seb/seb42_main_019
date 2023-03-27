import React, { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import Header2 from '../../components/common/Header2';
import styles from './SignUp.module.css';
import { DownIcon, UpIcon } from '../../components/IJH/LoginIcon';
import DropDown from '../../components/IJH/DropDown';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const [dropdownVisibility, setDropdownVisibility] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setpassword] = useState('');
	const [name, setName] = useState('');
	const [emailValid, setEmailValid] = useState(false);
	const [passwordValid, setpasswordValid] = useState(false);
	const [nickValid, setNickValid] = useState(false);
	const [showClear, setShowClear] = useState(false);
	const [region, setRegion] = useState('시 선택');
	// const [isOn, setIsOn] = useState(false);

	useEffect(() => {
		setRegion(region);
		setDropdownVisibility((dropdownVisibility) => !dropdownVisibility);
	}, [region]);

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
		setpassword(event.target.value);
		const regex =
			/^(?=.*[a-zA-z])(?=.*[0-9])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
		if (regex.test(event.target.value)) {
			setpasswordValid(true);
		} else {
			setpasswordValid(false);
		}
	};

	const handlename = (event) => {
		setName(event.target.value);
		const regex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
		if (regex.test(event.target.value)) {
			setNickValid(true);
		} else {
			setNickValid(false);
		}
	};

	const handleClear = () => {
		setEmail('');
	};

	const handleReset = () => {
		setpassword('');
	};

	const handleFocus = () => {
		setShowClear(true);
	};

	const handleOnChangeSelectValue = (e) => {
		const { innerText } = e.target;
		setRegion(innerText);
	};

	const handleChange = () => {
		if (region !== '시 선택') {
			return true;
		}
		return false;
	};

	const handleValue = () => {
		if (email === '') {
			alert('이메일을 입력하세요.');
		} else if (password === '') {
			alert('비밀번호를 입력하세요.');
		} else if (name === '') {
			alert('닉네임을 입력하세요.');
		} else if (region === '시 선택') {
			alert('지역을 선택하세요.');
		}
		return false;
	};

	const navigate = useNavigate();

	const handleApi = () => {
		console.log({ email, password, name, region });

		// api
		// 	.post(`/user`, {
		// 		name: name,
		// 		password: password,
		// 		region: region,
		// 		email: email,
		// 	})
		// 	.then((response) => {
		// 		if (response.data.code === 0) {
		// 			console.log(response);
		// 			alert('회원가입이 완료되었습니다.');
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 		alert('정보를 확인해주세요.');
		// 	});

		const memberData = {
			name: name,
			password: password,
			region: region,
			email: email,
		};

		api
			.post(`/user`, memberData, {
				validateStatus: false,
			})
			.then((response) => {
				console.log(response);
				alert('회원가입이 완료되었습니다.');
				navigate('/login');
			})
			.catch((error) => {
				alert('정보를 확인해주세요.');
				console.log(error.response);
			});

		// try {
		// 	const response = await axios.post(
		// 		`${process.env.REACT_APP_API_URL}/user`,
		// 		memberData,
		// 	);
		// 	console.log(response.data);
		// 	alert('회원가입이 완료되었습니다.');
		// } catch (error) {
		// 	alert('정보를 확인해주세요.');
		// 	console.error(error);
		// }
	};

	return (
		<main className={styles.Main}>
			<Header2>회원가입</Header2>
			<div className={styles.Input}>
				<label>이메일 주소</label>
				<div className={styles.Email}>
					<input
						type='text'
						value={email}
						onChange={handleEmail}
						required
						onFocus={handleFocus}
						placeholder='example@example.com'
					/>
					{email && showClear && (
						<button className={styles.Reset} onClick={handleClear}>
							X
						</button>
					)}
				</div>
				<div className={styles.errorMessage}>
					{!emailValid && email.length > 0 && (
						<div>올바른 이메일을 입력해주세요.</div>
					)}
				</div>
				<label>비밀번호</label>
				<div className={styles.PassWord}>
					<input
						type='password'
						value={password}
						onChange={handlePassword}
						placeholder='영문,숫자 조합 8~20자'
					></input>
					{password && showClear && (
						<button className={styles.passwordReset} onClick={handleReset}>
							X
						</button>
					)}
				</div>
				<div className={styles.errorMessage}>
					{!passwordValid && password.length > 0 && (
						<div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
					)}
				</div>
				<label>닉네임</label>
				<div className={styles.name}>
					<input
						type='text'
						value={name}
						onChange={handlename}
						placeholder='한글 또는 영문 2~12자'
					/>
				</div>
				<div className={styles.errorMessage}>
					{!nickValid && name.length > 0 && (
						<div>2자 이상 16자 이하로 입력해주세요.(영문 또는 한글)</div>
					)}
				</div>
				<label>사는 곳</label>
			</div>
			<div className={styles.City}>
				<div
					className={
						handleChange()
							? `${styles.Value} ${styles.clicked}`
							: `${styles.Value}`
					}
					onClick={() => {
						setDropdownVisibility(!dropdownVisibility);
					}}
				>
					<span>{region}</span>
					<button>{dropdownVisibility ? <UpIcon /> : <DownIcon />}</button>
				</div>
			</div>
			<DropDown visibility={dropdownVisibility}>
				<ul>
					<li onClick={handleOnChangeSelectValue}>서울특별시</li>
					<li onClick={handleOnChangeSelectValue}>부산광역시</li>
					<li onClick={handleOnChangeSelectValue}>대구광역시</li>
					<li onClick={handleOnChangeSelectValue}>인천광역시</li>
					<li onClick={handleOnChangeSelectValue}>광주광역시</li>
					<li onClick={handleOnChangeSelectValue}>대전광역시</li>
					<li onClick={handleOnChangeSelectValue}>울산광역시</li>
					<li onClick={handleOnChangeSelectValue}>세종특별자치시</li>
					<li onClick={handleOnChangeSelectValue}>경기도</li>
					<li onClick={handleOnChangeSelectValue}>강원도</li>
					<li onClick={handleOnChangeSelectValue}>충청북도</li>
					<li onClick={handleOnChangeSelectValue}>충청남도</li>
					<li onClick={handleOnChangeSelectValue}>전라북도</li>
					<li onClick={handleOnChangeSelectValue}>전라남도</li>
					<li onClick={handleOnChangeSelectValue}>경상북도</li>
					<li onClick={handleOnChangeSelectValue}>경상남도</li>
					<li onClick={handleOnChangeSelectValue}>제주특별자치도</li>
				</ul>
			</DropDown>
			<Button
				onClick={() => {
					handleValue();
					handleApi();
				}}
			>
				회원가입
			</Button>
		</main>
	);
};

export default SignUp;
