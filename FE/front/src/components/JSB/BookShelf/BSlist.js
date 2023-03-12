import style from './BSlist.module.css';
import bookcover from '../../../assets/bookcover.png';
import xIcon from '../../../assets/xIcon.png';

const BSlist = function () {
	return (
		<>
			<div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.bookimg1}>
							<img className={style.img1} src={bookcover} alt='bookcover' />
						</div>
						<div className={style.bookTitle}>
							<p className={style.bookTitlep}>명품 자바 에센셜</p>
						</div>
						<div className={style.bookDetail1}>
							<p className={style.bookDetail01}>김코딩(부산시)</p>
							<p className={`${style.bookDetail01} ${style.bookDetail02}`}>
								1시간 전
							</p>
						</div>
						<img className={style.xicon} src={xIcon} alt='xicon' />
						<div className={style.grade}>상</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BSlist;
