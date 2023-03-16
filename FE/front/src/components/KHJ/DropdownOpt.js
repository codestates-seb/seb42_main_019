function DropdownOpt( { onclick, book } ) {
    return (
        <>
            <li key={book.id}>
                <strong>{book.name}</strong>
                <span>{book.writer}</span>
            </li>
        </>
    );
}

export default DropdownOpt;