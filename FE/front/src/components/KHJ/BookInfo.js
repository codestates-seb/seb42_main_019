import classNames from "classnames/bind";
import styles from "./BookInfo.module.css"
import img from "../../assets/bookcover.png"
import Modal from '../../pages/HJ/M_BookInfo'

function BookInfo ({ book }) {
    const cx = classNames.bind(styles)
    return(
        <>
            <div className={cx('img')}>
                <img src={book.thumbnail} alt={book.title}></img>
            </div>
            <div className={cx('bookinfo')}>
                <div className={cx('left')}>
                    <h1>{book.title}</h1>
                    <p>
                        852p
                        <span>|</span>
                        1,786g
                        <span>|</span>
                        200*250*40mm
                    </p>
                    <p>{book.name}</p>
                    <p>생능출판사</p>
                    <p className={cx('date')}>2018년 06월</p>
                </div>
                <Modal bookData={book}>책 정보 더보기 +</Modal>
            </div>
        </>
    )
}

export default BookInfo;