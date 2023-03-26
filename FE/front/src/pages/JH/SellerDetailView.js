import React from 'react';
import styles from './CustomerDetailView.module.css';
import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';
import MessageList1 from '../../components/JSB/message/MessageList1';
import BookInfo from '../../components/KHJ/BookInfo';
import book from '../../dummyData/searchBookList';

const SellerDetailView = () => {
	return (
		<div className={styles.Main}>
			<Header2>등록된 책</Header2>
			<BookInfo book={book[0]} />
			<MessageList1 />
			<div className={styles.Text}>
				<label>책 설명</label>
				<div className={styles.TextIner}>
					또 읽으려고 가지고 있었는데, 다른책이 더 읽고 싶어졌어요.
				</div>
			</div>
			<div className={styles.BookState}>
				<label>책 상태</label>
				<div className={styles.State}>상</div>
			</div>
			<div className={styles.BookState}>
				<label>거래 상태</label>
				<div className={styles.SallState}>교환가능</div>
			</div>
			<Button>수정하기</Button>
		</div>
	);
};

export default SellerDetailView;
