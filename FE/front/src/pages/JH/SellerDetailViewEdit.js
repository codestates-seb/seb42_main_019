import React, { useState } from 'react';
import styles from './SellerDetailViewEdit.module.css';
import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';
import MessageList1 from '../../components/JSB/message/MessageList1';

const SellerDetailViewEdit = () => {
	const [activeButton, setActiveButton] = useState(false);

	const handleClick = (buttonName) => {
		setActiveButton(buttonName);
	};

	return (
		<div className={styles.Main}>
			<Header2>등록된 책</Header2>
			<MessageList1 />
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
			<div className={styles.BookState}>
				<label>거래 상태</label>
				<div className={styles.SallState}>교환가능</div>
			</div>
			<Button>책 등록하기</Button>
		</div>
	);
};

export default SellerDetailViewEdit;
