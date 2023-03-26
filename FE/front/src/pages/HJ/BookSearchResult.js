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
// import axios from "axios";
import axios from "../../api/api";

function BookSearchResult() {
    const cx = classNames.bind(styles);

    const params = useLocation();
    const urlSearch = params.search;
    // const currentQuery = new URLSearchParams(urlSearch).get('q')
    const [currentQuery, setCurrentQuery] = useState(new URLSearchParams(urlSearch).get('q'));

    const [bookData, setBookdata] = useState([]);

    const searchBook = async () => {
        const url = `/books/search?keyword=${currentQuery}`;
        try {
            const res = await axios.get(url);
            const books = res.data;
            setBookdata(books);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setCurrentQuery(currentQuery);
    }, [currentQuery, params])

    // useEffect(() => {
    //     axios.get(`http://ec2-3-35-22-107.ap-northeast-2.compute.amazonaws.com:8080/books/search?keyword=Java`)
    //     .then(response => {
    //         setBookdata(response.data);
    //     })
    //     .catch(error => {
    //         if (error.response) {
    //           // 서버가 4xx 또는 5xx 응답을 보낸 경우
    //           console.log(error.response.data);
    //           console.log(error.response.status);
    //           console.log(error.response.headers);
    //         } else if (error.request) {
    //           // 요청이 전송되었지만 응답을 받지 못한 경우
    //           console.log(error.request);
    //         } else {
    //           // 오류가 발생하여 요청을 보내지 못한 경우
    //           console.log('Error', error.message);
    //         }
    //         console.log(error.config);
    //       });
    // }, [currentQuery, urlSearch]);

    return (
        <>
            <Header2>검색결과</Header2>
            <main className={cx('main')}>
                <div className={cx('search')}>
                    <Search
                        currentQuery={currentQuery}
                        setCurrentQuery={setCurrentQuery}
                        searchBook={searchBook}
                    />
                </div>
                {bookData.map((el) =>
                <Link to={`/search/detail/${el.isbn}`} key={el.bookId}>
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

