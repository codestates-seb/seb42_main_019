import React, { useState } from 'react';
import styles from './CreateBook.module.css';
import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';

const CreateBook = () => {
	const [activeButton, setActiveButton] = useState(false);
	const [keyword, setKeyword] = useState('');

	const onChangeData = (e) => {
		setKeyword(e.currentTarget.value);
	};

	const handleClick = (buttonName) => {
		setActiveButton(buttonName);
	};

	return (
		<div className={styles.Main}>
			<Header2>책 등록하기</Header2>
			<div className={styles.Title}>
				<label>책 제목</label>
				<input type='text' placeholder='책 제목을 입력하세요.' />
				<div></div>
			</div>
			<div className={styles.Writer}>
				<label>책 저자</label>
				<input type='text' placeholder='책 저자를 입력하세요.'></input>
			</div>
			<div className={styles.Publisher}>
				<label>출판사</label>
				<input type='text' placeholder='출판사를 입력하세요.'></input>
			</div>
			<div className={styles.Text}>
				<label>책 설명</label>
				<textarea
					type='text'
					placeholder='책에 대해 설명해 주세요.
					ex) 또 읽으려고 가지고 있었는데, 다른책이 더 읽고 싶어졌어요.'
				></textarea>
			</div>
			<div className={styles.BookState}>
				<label>책 상태</label>
				<div className={styles.Buttons}>
					<button
						onClick={() => handleClick('button1')}
						className={activeButton === 'button1' ? `${styles['active']}` : ''}
					>
						상
					</button>
					<button
						onClick={() => handleClick('button2')}
						className={activeButton === 'button2' ? `${styles['active']}` : ''}
					>
						중
					</button>
					<button
						onClick={() => handleClick('button3')}
						className={activeButton === 'button3' ? `${styles['active']}` : ''}
					>
						하
					</button>
				</div>
			</div>
			<Button>등록하기</Button>
		</div>
	);
};

export default CreateBook;
