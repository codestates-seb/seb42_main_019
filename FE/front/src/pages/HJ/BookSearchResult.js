import Footer from "../../components/common/Footer";
import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav';
import Pagenation from "../../components/common/Pagenation";
import Search from "../../components/JSB/Search";
import styles from "./BookSearchResult.module.css"
import classNames from "classnames/bind";
import BS from "../../components/JSB/BookShelf/BS";
import bookdata from "../../dummyData/SB/bookData";

function BookSearchResult() {
    const cx = classNames.bind(styles)
    return (
        <>
            <Header2>검색결과</Header2>
            <main className={cx('main')}>
                <div className={cx('search')}>
                    <Search />
                </div>
                {bookdata.map((el) => <BS bookdata={el}/>)}
                <Pagenation />
            </main>
            <Footer />
            <Nav />
        </>
    );
}

export default BookSearchResult;