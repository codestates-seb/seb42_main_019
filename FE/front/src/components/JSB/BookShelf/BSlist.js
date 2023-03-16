import style from './BSlist.module.css';
import bookdata from '../../../dummyData/SB/bookData';
import xIcon from '../../../assets/xIcon.png';

const BSlist = function () {
	return (
		<>
			{bookdata.map((el)=>{
				return(
					<>
					<div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.bookimg1}>
							<img key={el.id} className={style.img1} src={el.imgurl} alt='bookcover' />
						</div>
						<div className={style.bookTitle}>
							<p className={style.bookTitlep}>{el.title}</p>
						</div>
						<div className={style.bookDetail1}>
							<p className={style.bookDetail01}>{el.name}({el.region})</p>
							<p className={`${style.bookDetail01} ${style.bookDetail02}`}>
								{el.time}시간 전
							</p>
						</div>
						<img className={style.xicon} src={xIcon} alt='xicon' />
						<div className={style.grade}>{el.grade}</div>
					</div>
				</div>
			</div>
					</>
				)
			})}
		</>
	);
};

export default BSlist;
