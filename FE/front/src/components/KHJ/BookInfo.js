import classNames from "classnames/bind";
import styles from "./BookInfo.module.css"
import Modal from '../../pages/HJ/M_BookInfo'

function BookInfo ({ book }) {
    const cx = classNames.bind(styles);
	const authors = book.authors.join(', ');
    return(
        <>
            <div className={cx('img')}>
                <img src={book.thumbnail} alt={book.title}></img>
            </div>
            <h1 className={cx('h1')}>{book.title}</h1>
            <div className={cx('bookinfo')}>
                <div className={cx('left')}>
                    <p>{authors}</p>
                    <p className={cx('date')}>{book.publisher}</p>
                </div>
                <Modal bookData={book}>책 정보 더보기 +</Modal>
            </div>
        </>
    );
};

export default BookInfo;