import BS from "../JSB/BookShelf/BS";
import bookdata from '../../dummyData/SB/bookData'

function booksearchList() {
    return (
        <>
            {bookdata.map((el) => <BS bookdata={el}/>)}
        </>
    );
}

export default booksearchList;