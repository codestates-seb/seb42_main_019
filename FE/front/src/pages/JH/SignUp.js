import React from 'react';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import styles from './SignUp.module.css';
import { BsCheckLg } from 'react-icons/lg';

const SignUp = () => {
	return (
		<main className={styles.Main}>
			<Header></Header>
			<div className={styles.Email}>
				<label>이메일 주소</label>
				<input type='text' placeholder='example@gamil.com' />
			</div>
			<div className={styles.PassWord}>
				<label>비밀번호</label>
				<input
					type='password'
					placeholder='영문,숫자,특수문자 조합 6~20자'
				></input>
			</div>
			<div className={styles.NickName}>
				<label>닉네임</label>
				<input type='text' placeholder='한글 또는 영문 6~12자' />
				<button className={styles.effect}>
					<BsCheckLg />
				</button>
			</div>
			<div className={styles.City}>
				<label>사는 곳</label>
			</div>
			<Button>회원가입</Button>
		</main>
	);
};

export default SignUp;
