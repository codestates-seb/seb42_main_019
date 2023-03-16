import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Header2 from '../../components/common/Header2';
import styles from './SignUp.module.css';
import { CheckIcon, DownIcon, UpIcon } from '../../components/IJH/LoginIcon';
import DropDown from '../../components/IJH/DropDown';

const SignUp = () => {
	const [dropdownVisibility, setDropdownVisibility] = useState(false);

	return (
		<main className={styles.Main}>
			<Header2>회원가입</Header2>
			<label>이메일 주소</label>
			<div className={styles.Email}>
				<input type='text' placeholder='example@gamil.com' />
			</div>
			<label>비밀번호</label>
			<div className={styles.PassWord}>
				<input
					type='password'
					placeholder='영문,숫자,특수문자 조합 6~20자'
				></input>
			</div>
			<label>닉네임</label>
			<div className={styles.NickName}>
				<input type='text' placeholder='한글 또는 영문 6~12자' />
				<button>
					<CheckIcon />
				</button>
			</div>
			<label>사는 곳</label>
			<div className={styles.City}>
				<div className={styles.Value}>
					<span>시 선택</span>
					<button onClick={(e) => setDropdownVisibility(!dropdownVisibility)}>
						{dropdownVisibility ? <UpIcon /> : <DownIcon />}
					</button>
				</div>
			</div>
			<DropDown visibility={dropdownVisibility}>
				<ul>
					<li>서울특별시</li>
					<li>서울특별시</li>
					<li>서울특별시</li>
					<li>서울특별시</li>
					<li>서울특별시</li>
					<li>서울특별시</li>
					<li>서울특별시</li>
					<li>서울특별시</li>
				</ul>
			</DropDown>

			<Button>회원가입</Button>
		</main>
	);
};

export default SignUp;
