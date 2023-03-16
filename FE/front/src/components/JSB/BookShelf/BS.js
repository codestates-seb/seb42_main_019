import style from './BSlist.module.css';
import xIcon from '../../../assets/xIcon.png';

const BS = function ({ bookdata }) {
	return (
		<>
        <div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.bookimg1}>
							<img key={bookdata.id} className={style.img1} src={bookdata.imgurl} alt='bookcover' />
						</div>
						<div className={style.bookTitle}>
							<p className={style.bookTitlep}>{bookdata.title}</p>
						</div>
						<div className={style.bookDetail1}>
							<p className={style.bookDetail01}>{bookdata.name}({bookdata.region})</p>
							<p className={`${style.bookDetail01} ${style.bookDetail02}`}>
								{bookdata.time}시간 전
							</p>
						</div>
						<button className={style.xIconbox}>
                        <img className={style.xicon} src={xIcon} alt='xicon' />
                        </button>
						<div className={style.grade}>{bookdata.grade}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BS;
