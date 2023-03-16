import Footer from "../../components/common/Footer";
import Header2 from "../../components/common/Header2";
import BookInfo from "../../components/KHJ/BookInfo";
import Nav from '../../components/common/Nav';
import CommentList from "../../components/KHJ/CommentList";
import BooksearchList from "../../components/KHJ/BooksearchList";
import Pagenation from "../../components/common/Pagenation";

function BookSearch() {
    return(
        <>
            <Header2>상세 정보</Header2>
            <main className='booksearch-main'>
                <BookInfo book={'book'} />
                <CommentList />
                <h2 className="font16 p20">이 책을 다 읽은 사람들</h2>
                <BooksearchList />
                <Pagenation />
            </main>
            <Footer />
            <Nav />
        </>
    )
}

export default BookSearch;