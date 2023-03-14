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
            <Header2>검색결과</Header2>
            <main className='booksearch-main'>
                <BookInfo book={'book'} />
                <CommentList />
                <BooksearchList />
                <Pagenation />
            </main>
            <Footer />
            <Nav />
        </>
    )
}

export default BookSearch;