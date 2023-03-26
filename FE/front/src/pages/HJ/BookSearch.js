import Footer from "../../components/common/Footer";
import Header2 from "../../components/common/Header2";
import BookInfo from "../../components/KHJ/BookInfo";
import Nav from '../../components/common/Nav';
import CommentList from "../../components/KHJ/CommentList";
import BooksearchList from "../../components/KHJ/BooksearchList";
import Pagenation from "../../components/common/Pagenation";
import bookData from "../../dummyData/searchBookList";

function BookSearch() {

    return(
        <>
            <Header2>상세 정보</Header2>
            <main className='booksearch-main'>
                <BookInfo book={bookData[0]} />
                <CommentList />
                <h2 className="font16 p20">거래대기 중</h2>
                <BooksearchList bookData={bookData}/>
                <Pagenation />
            </main>
            <Footer />
            <Nav />
        </>
    )
}

export default BookSearch;