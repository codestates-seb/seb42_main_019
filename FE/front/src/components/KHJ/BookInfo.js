import classNames from "classnames/bind";
import styles from "./BookInfo.module.css"
import img from "../../assets/bookcover.png"

function BookInfo ({ book }) {
    const cx = classNames.bind(styles)
    return(
        <>
            <div className={cx('img')}>
                <img src={img} alt={book.name}></img>
            </div>
            <div className={cx('bookinfo')}>
                <div className={cx('left')}>
                    <h1>BOOK NAME</h1>
                    <p>
                        852p
                        <span>|</span>
                        1,786g
                        <span>|</span>
                        200*250*40mm
                    </p>
                    <p>황기태, 김효수 저</p>
                    <p>생능출판사</p>
                    <p className={cx('date')}>2018년 06월</p>
                </div>
                <button className={cx('btn')}>책 정보 더보기 +</button>
            </div>
        </>
    )
}

export default BookInfo;