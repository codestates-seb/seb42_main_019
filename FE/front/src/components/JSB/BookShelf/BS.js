import style from './BSlist.module.css';
import bookdata from '../../../dummyData/SB/bookData';
import xIcon from '../../../assets/xIcon.png';

const BS = function () {
	return (
		<>
        <div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.bookimg1}>
							<img key={bookdata[1].id} className={style.img1} src={bookdata[1].imgurl} alt='bookcover' />
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
						<button className={style.xIconbox}>
                        <img className={style.xicon} src={xIcon} alt='xicon' />
                        </button>
						<div className={style.grade}>{bookdata[1].grade}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BS;
