import Footer from "../../components/common/Footer";
import Header2 from "../../components/common/Header2";
import BookInfo from "../../components/KHJ/BookInfo";
import Nav from '../../components/common/Nav';
import CommentList from "../../components/KHJ/CommentList";
import Pagenation from "../../components/common/Pagenation";
import { useEffect, useState } from "react";
import axios from "../../api/api";
import { Link, useParams } from "react-router-dom";
import BS from "../../components/KHJ/BS";
import Loading from "./Loaging";

function BookSearch() {

    const params = useParams()

    const [bookData, setBookdata] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const bookInfo = async () => {
        const url = `/books/search/isbn?isbn=${params.isbn}`;
        try {
            const res = await axios ({
                method: 'get',
                url
            })
            const book = res.data;
            setBookdata(book);
        } catch (error) {
            console.log(error);
        };
    }

    useEffect(() => {
        bookInfo();
    }, []);


    if(bookData === null){
        return <Loading />
    } else{
        return(
            <>
                <Header2>상세 정보</Header2>
                <main className='booksearch-main'>
                    <BookInfo book={bookData[0]} />
                    <CommentList bookId={bookData[0].bookId}/>
                    <h2 className="font16 p20">거래대기 중</h2>
                    {bookData.map((el) => 
                        <Link to ={`/customer/detailView/${el.bookId}`} key={el.bookId}>
                            <BS bookData={el}/>
                        </Link>
                    )}
                    <Pagenation />
                </main>
                <Footer />
                <Nav />
            </>
        )
    }
}

export default BookSearch;