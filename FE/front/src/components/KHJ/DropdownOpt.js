function DropdownOpt( { bookChange, book } ) {
    return (
        <>
            <li onClick={() => bookChange(book.name)} key={book.id}>
                <strong>{book.name}</strong>
                <span>{book.writer}</span>
            </li>
        </>
    );
}

export default DropdownOpt;
