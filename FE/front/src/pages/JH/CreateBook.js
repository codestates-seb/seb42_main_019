import React, { useState, useEffect } from 'react';
import styles from './CreateBook.module.css';
import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';
import api from './../../api/api';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
	const [conditions, setConditions] = useState(false);

	const [keyword, setKeyword] = useState([]);
	const [title, setTitle] = useState('');
	const [authors, setAuthors] = useState('');
	const [publisher, setPublisher] = useState('');
	const [description, setDescription] = useState('');
	const [thumbnail, setThumnail] = useState('');
	const [isbn, setIsbn] = useState('');
	const [url, setUrl] = useState('');
	const [contents, setContents] = useState('');
	
	// const bookTitleClick = (el) => {
	// 	setBookData(el)
	// }

	useEffect(() => {
		if(title !== ''){
			loadBook();
		}
	},[title])

	const loadBook = async () => {
		try{
			const response = await api.get(`/books/bookInfo?bookTitle=${title}`);
			setKeyword(response.data);
		} catch(err){
			console.log(err)
		}
	};

	// const onChangeHandler = (Text) => {
	// 	setTitle(Text);
	// };

	const handleClick = (buttonName) => {
		setConditions(buttonName);
	};

	const onInput = (idx) => {
		setTitle(keyword[idx].title);
		setAuthors(keyword[idx].authors.join());
		setPublisher(keyword[idx].publisher);
		setThumnail(keyword[idx].thumbnail);
		setIsbn(keyword[idx].isbn);
		setUrl(keyword[idx].url);
		setContents(keyword[idx].contents);
	}

	const navigate = useNavigate();

	async function handleApi() {

		const createBookData = {
			thumbnail: thumbnail,
			authors: authors.split(',').map((author) => author.trim()),
			publisher: publisher,
			title: title,
			isbn: isbn,
			url: url,
			contents: contents,
			description: description,
			conditions: conditions,
		}

		try {
			const response = await api({
				method: 'post',
				url: '/books',
				data: createBookData,
			});

			// const token = response.headers.authorization; // extract token from headers

			// if (token) {
			// 	localStorage.setItem('accessToken', token); // save token to local storage
			// }

			alert('책 등록 완료');
			navigate('/myBookShelf');
		} catch (error) {
			console.error(error);
			alert('내용을 확인해주세요.');
		}
	}

	return (
		<div className={styles.Main}>
			<Header2>책 등록하기</Header2>
			<div className={styles.Title}>
				<label>책 제목</label>
				<div>
					<input
						type='text'
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						placeholder='책 제목을 입력하세요.'
					/>
					<ul className={styles.search}>
						{keyword.map((el, idx) => (
							<li onClick={() => onInput(idx)}>{el.title}</li>
						))}
					</ul>
				</div>
			</div>
			<div className={styles.Writer}>
				<label>책 저자</label>
				<input 
					type='text' 
					value={authors} 
					onChange={(e) => setAuthors(e.target.value)} 
					placeholder='책 저자를 입력하세요.'
				/>
			</div>
			<div className={styles.Publisher}>
				<label>출판사</label>
				<input 
					type='text' 
					value={publisher}
					onChange={(e) => setPublisher(e.target.value)}
					placeholder='출판사를 입력하세요.'
				/>
			</div>
			<div className={styles.displayNone}>
				<input
					type='text'
					value={thumbnail}
					onChange={(e) => setThumnail(e.target.value)}
				/>
				<input
					type='text'
					value={isbn}
					onChange={(e) => setIsbn(e.target.value)}
				/>
				<input
					type='text'
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
				<input
					type='text'
					value={contents}
					onChange={(e) => setContents(e.target.value)}
				/>
			</div>
			<div className={styles.Text}>
				<label>책 설명</label>
				<textarea
					type='text'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder='책에 대해 설명해 주세요.
					ex) 또 읽으려고 가지고 있었는데, 다른책이 더 읽고 싶어졌어요.'
				></textarea>
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
			<Button
				onClick={() => {
					handleApi();
				}}
			>
				등록하기
			</Button>
		</div>
	);
};

export default CreateBook;
