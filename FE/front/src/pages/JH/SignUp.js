import React, { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import Header2 from '../../components/common/Header2';
import styles from './SignUp.module.css';
import { DownIcon, UpIcon } from '../../components/IJH/LoginIcon';
import DropDown from '../../components/IJH/DropDown';

const SignUp = () => {
	const [dropdownVisibility, setDropdownVisibility] = useState(false);

	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [nickname, setNickname] = useState('');
	const [emailValid, setEmailValid] = useState(false);
	const [pwValid, setPwValid] = useState(false);
	const [nickValid, setNickValid] = useState(false);

	const [showClear, setShowClear] = useState(false);

	const [currentValue, setCurrentValue] = useState('시 선택');

	useEffect(() => {
		setCurrentValue(currentValue);
		setDropdownVisibility(dropdownVisibility =>!dropdownVisibility);
		console.log('ho');
	}, [currentValue]);

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

	const handleNickname = (event) => {
		setNickname(event.target.value);
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
		setPw('');
	};

	const handleFocus = () => {
		setShowClear(true);
	};

	const handleOnChangeSelectValue = (e) => {
		const { innerText } = e.target;
		setCurrentValue(innerText);
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
						placeholder='example@gamil.com'
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
						value={pw}
						onChange={handlePassword}
						placeholder='영문,숫자,특수문자 조합 6~20자'
					></input>
					{pw && showClear && (
						<button className={styles.PwReset} onClick={handleReset}>
							X
						</button>
					)}
				</div>
				<div className={styles.errorMessage}>
					{!pwValid && pw.length > 0 && (
						<div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
					)}
				</div>
				<label>닉네임</label>
				<div className={styles.NickName}>
					<input
						type='text'
						value={nickname}
						onChange={handleNickname}
						placeholder='한글 또는 영문 2~12자'
					/>
				</div>
				<div className={styles.errorMessage}>
					{!nickValid && nickname.length > 0 && (
						<div>2자 이상 16자 이하로 입력해주세요.(영문 또는 한글)</div>
					)}
				</div>
				<label>사는 곳</label>
			</div>
			<div className={styles.City}>
				<div
					className={styles.Value}
					onClick={() => {
						setDropdownVisibility(!dropdownVisibility);
					}}
				>
					<span>{currentValue}</span>
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
			<Button>회원가입</Button>
		</main>
	);
};

export default SignUp;
