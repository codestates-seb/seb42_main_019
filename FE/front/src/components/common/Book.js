import style from './BookList.module.css';
import bookdata from '../../dummyData/SB/bookData';

function Book() {
	return (
		<>
        <div className={style.box1}>
        <div className={style.notFooter}>
            <div className={style.listboxMessage}>
                <div className={style.bookimg1}>
                    <img className={style.img1} src={bookdata[1].imgurl} alt='bookcover' />
                </div>
                <div className={style.bookTitle}>
                    <p className={style.bookTitlep}>{bookdata[1].title}</p>
                </div>
                <div className={style.bookDetail1}>
                    <p className={style.bookDetail01}>{bookdata[1].name}({bookdata[1].region})</p>
                    <p className={`${style.bookDetail01} ${style.bookDetail02}`}>
                        {bookdata[1].time}시간 전
                    </p>
                </div>
            </div>
        </div>
    </div>
		</>
	);
}

export default Book;
