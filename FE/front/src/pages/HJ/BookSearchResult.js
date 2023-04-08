import Footer from "../../components/common/Footer";
import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav';
import Pagenation from "../../components/common/Pagenation";
import Search from "../../components/JSB/Search";
import styles from "./BookSearchResult.module.css"
import classNames from "classnames/bind";
import BS from "../../components/KHJ/BS";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/api";

function BookSearchResult() {
    const cx = classNames.bind(styles);
    
    const params = useLocation();
    const urlSearch = params.search;
    const searchQuery = new URLSearchParams(urlSearch).get('q');
    const [currentQuery, setCurrentQuery] = useState(searchQuery);

    const [bookData, setBookdata] = useState([]);
  
    const searchBook = async (currentQuery) => {
        const url = `/books/search?keyword=${currentQuery}`;
        try {
            const res = await axios.get(url);
            const books = res.data;
            setBookdata(books);
        } catch (error) {
            console.log(error);
        };
    };
    
    useEffect(() => {
        searchBook(currentQuery);
        setCurrentQuery(searchQuery);
    }, []);
    
    return (
        <>
            <Header2>검색결과</Header2>
            <main className={cx('main')}>
                <div className={cx('search')}>
                    <Search searchBook={searchBook}/>
                </div>
                {bookData.length === 0 ?
                    <div className={cx('no-data')}>
                        <p>검색 결과가 없습니다.</p>
                    </div>
                    :
                    bookData.map((el) =>
                    <Link to={`/search/detail/${el.isbn}`} key={el.bookId}>
                        <BS bookData={el}/>
                    </Link>
                    )
                }
            </main>
            <Footer />
            <Nav />
        </>
    );
}

export default BookSearchResult;

