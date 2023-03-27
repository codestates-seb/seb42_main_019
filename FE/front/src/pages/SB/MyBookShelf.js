import Header2 from '../../components/common/Header2';
import style from './MyBookShelf.module.css';
import Nav from '../../components/common/Nav';
import BookShelf from '../../assets/bookshelf.png'
import classNames from 'classnames/bind';
import BSlist from '../../components/JSB/BookShelf/BSlist';
import Pagenation from '../../components/common/Pagenation';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import bookData from '../../dummyData/SB/bookData'

//1. 책을 하나씩 삭제할 수 있다.
//2. 내가 등록한 책을 확인할 수 있다.
//3. 내가 등록한 책을 누르면 해당 책 상세페이지로 이동할 수 있다.
//4. 내가 등록한 책을 전체 삭제할 수 있다.
//5. 책 상세페이지에서 상태가 변하면 내 책장에서 책이 삭제처리된다.

const MyBookShelf = () => {
	const cx = classNames.bind(style);
    const history = useNavigate();
    const [book, setBook] = useState([]);

    useEffect(()=>{
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://ec2-3-35-22-107.ap-northeast-2.compute.amazonaws.com:8080/books');
                const bookData = response.data;
                const filteredData = bookData.filter((book) => book.exchanged !== '교환 완료')
                setBook(bookData);
                
                console.log('Books Here', filteredData);
            }catch(error){
                console.error('error is Here', error);
            }
        };
    
        const savedBooks = localStorage.getItem('book');
        if(savedBooks){
            setBook(JSON.parse(savedBooks));
        }
        fetchBooks();
    }, []);


    const handleClick2 = (id) =>{
        const updatedList = book.filter(book => book.id !== id)
        setBook(updatedList);
        localStorage.setItem('book', JSON.stringify(updatedList));
        console.log(book)
        history('/myBookShelf')}

    const handleClick3 = () =>{
        const nullList = [];
        setBook(nullList);
        localStorage.setItem('book', JSON.stringify(nullList));
        history('/myBookShelf')
    }

    return(
        <>
        <Header2>내 책장</Header2>
        <div className={cx('mbsBox')}>
            <div className={cx('mbsImgBox')}>
                <img onClick={handleClick3} src={BookShelf} className={cx('mbsimg')} alt='mbsimg' />
            </div>
            <div className={cx('mbsBody')}>
                <p className={cx('mbsText')}>내가 등록한 책</p>
                <div className={cx('map')}>
                    {book.map((el)=><BSlist handleClick2={handleClick2} key={el.id} book={el} />)}
                </div>
            </div>
            <Pagenation />
        </div>
        <Nav />
        </>
    )
}

export default MyBookShelf;