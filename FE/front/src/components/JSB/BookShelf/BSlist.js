import style from './BSlist.module.css';
import xIcon from '../../../assets/xIcon.png';

const BSlist = function ({book, handleClick2}) {
	return (
		<>
				
					<div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.bookimg1}>
							<img key={book.id} className={style.img1} src={book.thumbnail} alt='bookcover' />
						</div>
						<div className={style.bookTitle}>
							<p className={style.bookTitlep}>{book.title}</p>
						</div>
						<div className={style.bookDetail1}>
							<p className={style.bookDetail01}>{book.name}({book.region})</p>
							<p className={`${style.bookDetail01} ${style.bookDetail02}`}>
								{book.time}시간 전
							</p>
						</div>
						<button onClick={()=>{handleClick2(book.id)}} className={style.xIconbox}>
                        <img className={style.xicon} src={xIcon} alt='xicon' />
                        </button>
						<div className={style.grade}>{book.condition}</div>
					</div>
				</div>
			</div>
			
		</>
	);
};

export default BSlist;
