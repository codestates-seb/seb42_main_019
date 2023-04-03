import React, { useState, useEffect } from 'react';
import styles from './SellerDetailViewEdit.module.css';
import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';
import MessageList1 from '../../components/JSB/message/MessageList1';
import BookInfo from '../../components/KHJ/BookInfo';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

const SellerDetailViewEdit = () => {
	const [conditions, setConditions] = useState('');
	const [description, setDescription] = useState('');
	const [exchange, setExchange] = useState();
  
	const bookId = useParams();
	const [bookData, setBookData] = useState([]);
  
	const handleClick = (value) => {
	  setConditions(value);
	};
  
	useEffect(() => {
	  const fetchBookData = async () => {
		try {
		  const response = await api.get(`/books/${bookId.editId}`);
		  const { data } = response;
		  setBookData(data);
		  setConditions(data.conditions);
		  setDescription(data.description);
		  setExchange(data.exchange);
		  console.log(bookData);
		  if (data) {
			console.log(data);
		  }
		} catch (error) {
		  console.error(error);
		}
	  };
	  fetchBookData();
	}, []);

	const navigate = useNavigate();

	const handleSubmit = async () => {
		try {
  console.log('id',bookId.editId);
		  const response = await api.patch(`/books/${bookId.editId}`, {
		   description: description,
		   conditions: conditions,
		   exchange: exchange,
		  });
		  console.log(response.data);
		  navigate(`/seller/detailView/${bookId.editId}`)
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
					<div className={styles.profile}>
						<MessageList1 profile={bookData.user}/>
					</div>
				<div className={styles.Text}>
					<label>책 설명</label>
					<textarea
						type='text'
						defaultValue={bookData.description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>
				<div className={styles.BookState}>
					<label>책 상태</label>
					<div className={styles.Buttons}>
						<button
							defaultValue={bookData.conditions === '상'}
							onClick={() => handleClick('상')}
							className={conditions === '상' ? `${styles['active']}` : ''}
						>
							상
						</button>
						<button
							defaultValue={bookData.conditions === '중'}
							onClick={() => handleClick('중')}
							className={conditions === '중' ? `${styles['active']}` : ''}
						>
							중
						</button>
						<button
							defaultValue={bookData.conditions === '하'}
							onClick={() => handleClick('하')}
							className={conditions === '하' ? `${styles['active']}` : ''}
						>
							하
						</button>
					</div>
				</div>
				<div 
					className={styles.exchangeState}
					defaultValue={bookData.exchange ?? '교환 가능'}
				>
					<label>거래 상태</label>
					<div className={styles.SallState}>
						<select 
							onChange={(e) => setExchange(e.target.value)}
						>
							<option value={0}>교환 가능</option>
							<option value={1}>교환 완료</option>
						</select>
					</div>
				</div>
				<Button onClick={handleSubmit}>수정완료</Button>
			</div>
		);
	}
};

export default SellerDetailViewEdit;
