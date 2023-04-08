import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/api';
import { Link } from 'react-router-dom';

import style from './MyBookShelf.module.css';
import classNames from 'classnames/bind';

import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav';
import Pagenation from '../../components/common/Pagenation';
import BSlist from '../../components/JSB/BookShelf/BSlist';
import BookShelf from '../../assets/bookshelf.png'

//1. 책을 하나씩 삭제할 수 있다. ( )
//2. 내가 등록한 책을 확인할 수 있다. (0)
//3. 내가 등록한 책을 누르면 해당 책 상세페이지로 이동할 수 있다. ( )
//4. 책 상세페이지에서 상태가 변하면 내 책장에서 책이 삭제처리된다. ( )

const MyBookShelf = () => {
	const cx = classNames.bind(style);
    const [book, setBook] = useState([]);
    const [books, setBooks] = useState([]);


    useEffect(()=>{
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`/books`);
                const bookData = response.data;
                const filteredData = bookData.filter((book) => book.exchanged !== '교환 완료')
                setBook([...filteredData]);
                
            }catch(error){
                console.error('error is Here', error);
            }
        };
        fetchBooks();
    }, []);


    const handleDeleteBook = async (bookId) => {
        try{
            const response = await axios.delete(`/books/${bookId}`);
            console.log("response.data",response.data);
            window.location.reload()
        }catch(error){
            console.log(error);
        }

        }



    return(
        <>
        <Header2>내 책장</Header2>
        <div className={cx('mbsBox')}>
            <div className={cx('mbsImgBox')}>
                <img src={BookShelf} className={cx('mbsimg')} alt='mbsimg' />
            </div>
            <div className={cx('mbsBody')}>
                <p className={cx('mbsText')}>내가 등록한 책</p>
                <div className={cx('map')}>
                    {book.map((book)=>
                        <Link to ={`/seller/detailView/${book.bookId}`} key={book.bookId}>
                            <BSlist handleClick2={()=>handleDeleteBook(book.bookId)} key={book.id} book={book} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
        <Nav />
        </>
    )
}

export default MyBookShelf;