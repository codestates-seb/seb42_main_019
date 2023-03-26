import Header2 from '../../components/common/Header2';
import style from './MyBookShelf.module.css';
import Nav from '../../components/common/Nav';
import BookShelf from '../../assets/bookshelf.png'
import classNames from 'classnames/bind';
import BSlist from '../../components/JSB/BookShelf/BSlist';
import Pagenation from '../../components/common/Pagenation';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//1. 책을 하나씩 삭제할 수 있다.
//2. 내가 등록한 책을 확인할 수 있다.
//3. 내가 등록한 책을 누르면 해당 책 상세페이지로 이동할 수 있다.
//4. 내가 등록한 책을 전체 삭제할 수 있다.
//5. 책 상세페이지에서 상태가 변하면 내 책장에서 책이 삭제처리된다.

const MyBookShelf = () => {
	const cx = classNames.bind(style);
    const history = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://ec2-3-35-22-107.ap-northeast-2.compute.amazonaws.com:8080/books/search/isbn?isbn=8979145985 9788979145984');
                const bookData = response.data;
                const filteredData = bookData.filter((book) => book.exchanged !== '교환 완료')
                setBooks(bookData);
                
                console.log('Books Here', filteredData);
            }catch(error){
                console.error('error is Here', error);
            }
        };
    
        const savedBooks = localStorage.getItem('book');
        if(savedBooks){
            setBooks(JSON.parse(savedBooks));
        }
        fetchBooks();
    }, []);

    //[0326]책 삭제 필터링은 다시 생각해보자
    //1. 내가 올린 책 순서대로 bookId가 생기지 않음 -> id 필터링이 어려움
    //2. 삭제해도 로컬스토리지에 저장되지 않는 이유는?

    const handleDeleteBook = (id) =>{
        const updatedList = books.filter((book) => book.bookId !== id)
        setBooks(updatedList);
        localStorage.setItem('books', JSON.stringify(updatedList));
        history('/myBookShelf')}

    const handleDeleteAllBooks = () =>{
        const nullList = [];
        setBooks(nullList);
        localStorage.setItem('book', JSON.stringify(nullList));
        history('/myBookShelf')
    }



    return(
        <>
        <Header2>내 책장</Header2>
        <div className={cx('mbsBox')}>
            <div className={cx('mbsImgBox')}>
                <img onClick={handleDeleteAllBooks} src={BookShelf} className={cx('mbsimg')} alt='mbsimg' />
            </div>
            <div className={cx('mbsBody')}>
                <p className={cx('mbsText')}>내가 등록한 책</p>
                <div className={cx('map')}>
                    {books.map((book)=><BSlist handleClick2={handleDeleteBook} key={book.id} book={book} />)}
                </div>
            </div>
            <Pagenation />
        </div>
        <Nav />
        </>
    )
}

export default MyBookShelf;






