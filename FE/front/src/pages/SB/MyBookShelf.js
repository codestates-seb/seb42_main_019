import Header2 from '../../components/common/Header2';
import style from './MyBookShelf.module.css';
import Nav from '../../components/common/Nav';
import BookShelf from '../../assets/bookshelf.png'
import classNames from 'classnames/bind';
import BSlist from '../../components/JSB/BookShelf/BSlist';
import Pagenation from '../../components/common/Pagenation';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import bookData from '../../dummyData/SB/bookData'

const MyBookShelf = () => {
	const cx = classNames.bind(style);
    const history = useNavigate();
    const [book, setBook] = useState(bookData);

    useEffect(()=>{
        const savedBooks = localStorage.getItem('book');
        if(savedBooks){
            setBook(JSON.parse(savedBooks));
        }
    }, []);

    const handleClick2 = (id) =>{
        const updatedList = book.filter(book => book.id !== id)
        setBook(updatedList);
        localStorage.setItem('book', JSON.stringify(updatedList));
        console.log(book)
        history('/myBookShelf')}

    const handleClick3 = (id) =>{
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