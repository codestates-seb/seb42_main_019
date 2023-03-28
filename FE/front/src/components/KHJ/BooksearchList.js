import BS from "../KHJ/BS";

function bookSearchList( { bookData } ) {
    return (
        <>
            {bookData.map((el) => <BS bookData={el}/>)}
        </>
    );
}

export default bookSearchList;