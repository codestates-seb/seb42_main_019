import React from 'react';
import styles from './CustomerDetailView.module.css';
import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';
import BookInfo from '../../components/KHJ/BookInfo';
import MessageList1 from '../../components/JSB/message/MessageList1';

const CustomerDetailView = () => {
	return (
		<div className={styles.Main}>
			<Header2>등록된 책</Header2>
			<BookInfo></BookInfo>
			<MessageList1></MessageList1>
			<div className={styles.Text}>
				<label>책 설명</label>
				<div className={styles.TextIner}>
					또 읽으려고 가지고 있었는데, 다른책이 더 읽고 싶어졌어요.
				</div>
			</div>
			<Button>교환 신청하기</Button>
		</div>
	);
};

export default CustomerDetailView;
