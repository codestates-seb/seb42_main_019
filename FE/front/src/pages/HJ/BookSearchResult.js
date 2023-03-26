import Footer from "../../components/common/Footer";
import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav';
import Pagenation from "../../components/common/Pagenation";
import Search from "../../components/JSB/Search";
import styles from "./BookSearchResult.module.css"
import classNames from "classnames/bind";
import BS from "../../components/JSB/BookShelf/BS";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function BookSearchResult() {
    const cx = classNames.bind(styles);

    const params = useLocation();
    const urlSearch = params.search;
    const currentQuery = new URLSearchParams(urlSearch).get('q')
    // console.log(urlSearch)
    // console.log(currentQuery)

    // const [bookData, setBookdata] = useState([]);

    // useEffect(() => {
    //     axios.get(`http://ec2-3-35-22-107.ap-northeast-2.compute.amazonaws.com:8080/search?q=${currentQuery}`)
    // }, []);

    return (
        <>
            <Header2>검색결과</Header2>
            <main className={cx('main')}>
                <div className={cx('search')}>
                    <Search />
                </div>
                {bookData.map((el) =>
                <Link to={`/search/detail/${el.isbn}`}>
                    <BS bookData={el}/>
                </Link>
                )}
                <Pagenation />
            </main>
            <Footer />
            <Nav />
        </>
    );
}

export default BookSearchResult;

