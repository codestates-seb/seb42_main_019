import style from './BSlist.module.css';
import xIcon from '../../../assets/xIcon.png';

const BS = function ({ bookData }) {
	return (
		<>
        <div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.bookimg1}>
							<img key={bookData.id} className={style.img1} src={bookData.thumbnail} alt='bookcover' />
						</div>
						<div className={style.bookTitle}>
							<p className={style.bookTitlep}>{bookData.title}</p>
						</div>
						<div className={style.bookDetail1}>
							<p className={style.bookDetail01}>{bookData.name}({bookData.region})</p>
							<p className={`${style.bookDetail01} ${style.bookDetail02}`}>
								{bookData.time}시간 전
							</p>
						</div>
						<button className={style.xIconbox}>
                        <img className={style.xicon} src={xIcon} alt='xicon' />
                        </button>
						<div className={style.grade}>{bookData.condition}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BS;
