import Footer from "../../components/common/Footer";
import Header2 from "../../components/common/Header2";
import BookInfo from "../../components/KHJ/BookInfo";
import Nav from '../../components/common/Nav';
import CommentList from "../../components/KHJ/CommentList";

function BookSearch() {
    return(
        <>
            <Header2>검색결과</Header2>
            <main className='main'>
                <BookInfo book={'book'} />
                <CommentList />
            </main>
            <Footer />
            <Nav />
        </>
    )
}

export default BookSearch;