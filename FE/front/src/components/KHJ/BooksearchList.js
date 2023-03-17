import BS from "../JSB/BookShelf/BS";
import bookData from '../../dummyData/SB/bookData'

function bookSearchList() {
    return (
        <>
            {bookData.map((el) => <BS bookData={el}/>)}
        </>
    );
}

export default bookSearchList;