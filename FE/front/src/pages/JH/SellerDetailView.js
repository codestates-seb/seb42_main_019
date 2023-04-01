import React, { useEffect, useState } from 'react';
import styles from './SellerDetailView.module.css';
import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';
import MessageList1 from '../../components/JSB/message/MessageList1';
import BookInfo from '../../components/KHJ/BookInfo';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';

const SellerDetailView = () => {
	const bookId = useParams();
	const [bookData, setBookData] = useState([]);
	const user = bookData.user;
	const bookIdProfile = bookData.bookId;
	console.log(bookId);


	const fetchBookData = async () => {
		try {
			const response = await api.get(`/books/${bookId.sellerId}`);
			const { data } = response;
			setBookData(data);
			if(data) {
				console.log(data);
			}
		} catch(error) {
			console.error(error);
		}
	};
		
	useEffect(() => {
		fetchBookData();
	},[]);

	// const fetchBookData = async () => {
	// 	const response = await api.get(`/books/${bookId.bookId}`);
	// 	const { data } = response;
	// 	setBookData(data);
	// 	console.log(response);
	// }

	console.log(bookData);
	console.log(bookData.user);

	if(bookData.length === 0){
		return <div>로딩중..</div>
	} else {
		return (
			<div className={styles.Main}>
				<Header2>등록된 책</Header2>
				<BookInfo book={bookData} />
				<Link to={`/userRate/${bookIdProfile}`}>
					<div className={styles.profile}>
						<MessageList1 profile={user}/>
					</div>
				</Link>
				<div className={styles.Text}>
					<label>책 설명</label>
					<div className={styles.TextIner}>
						{bookData.description}
					</div>
				</div>
				<div className={styles.BookState}>
					<label>책 상태</label>
					<div className={styles.State}>{bookData.conditions}</div>
				</div>
				<div className={styles.exchangeState}>
					<label>거래 상태</label>
					<div className={styles.SallState}>
						{bookData.exchange ?? '교환 가능'}
					</div>
				</div>
				<Link to={`/seller/detailView/edit/${bookId.sellerId}`}>
					<Button>수정하기</Button>
				</Link>
			</div>
		);
	}
};

export default SellerDetailView;
