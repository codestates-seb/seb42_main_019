import React, { useState, useEffect } from 'react';
import styles from './SellerDetailViewEdit.module.css';
import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';
import MessageList1 from '../../components/JSB/message/MessageList1';
import BookInfo from '../../components/KHJ/BookInfo';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';

const SellerDetailViewEdit = () => {
	const [conditions, setConditions] = useState(false);
	const [description, setDescription] = useState('');
	const [exchange, setExchange] = useState('');

	const bookId = useParams();
	const [bookData, setBookData] = useState([]);
	const user = bookData.user;

	const handleClick = (buttonName) => {
		setConditions(buttonName);
	};

	useEffect(() => {
		const fetchBookData = async () => {
			try {
				const response = await api.get(`/books/${bookId.editId}`);
				const { data } = response;
				setBookData(data);
				if(data) {
					console.log(data);
				}
			} catch(error) {
				console.error(error);
			}
		};
		fetchBookData();
	},[]);

	console.log(bookId);

	const handleSubmit = async () => {
		try {
		  const response = await api.patch(`/books/${bookId.editId}`, {
			description: description,
			condition: conditions,
			exchange: exchange,
		  });
		  console.log(response.data);
		} catch (error) {
		  console.error(error);
		}
	  };

	if(bookData.length === 0){
		return <div className={styles.loading}>로딩중...</div>
	} else {
		return (
			<div className={styles.Main}>
				<Header2>등록된 책</Header2>
				<BookInfo book={bookData} />
						<Link to={`/userRate/${user.userId}`}>
							<div className={styles.profile}>
								<MessageList1 profile={bookData.user}/>
							</div>
						</Link>
				<div className={styles.Text}>
					<label>책 설명</label>
					<textarea
						type='text'
						placeholder='책에 대해 설명해 주세요.
						ex) 또 읽으려고 가지고 있었는데, 다른책이 더 읽고 싶어졌어요.'
					>{bookData.description}</textarea>
				</div>
				<div className={styles.BookState}>
					<label>책 상태</label>
					<div className={styles.Buttons}>
						<button
							onClick={() => handleClick('상')}
							className={conditions === '상' ? `${styles['active']}` : ''}
						>
							상
						</button>
						<button
							onClick={() => handleClick('중')}
							className={conditions === '중' ? `${styles['active']}` : ''}
						>
							중
						</button>
						<button
							onClick={() => handleClick('하')}
							className={conditions === '하' ? `${styles['active']}` : ''}
						>
							하
						</button>
					</div>
				</div>
				<div className={styles.exchangeState}>
					<label>거래 상태</label>
					<div className={styles.SallState}>
						{bookData.exchange ?? '교환 가능'}
					</div>
				</div>
				<Button onClick={handleSubmit}>책 등록하기</Button>
			</div>
		);
	}
};

export default SellerDetailViewEdit;
