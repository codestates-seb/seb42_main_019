import style from './BSlist.module.css';
import xIcon from '../../../assets/xIcon.png';

const BSlist = function ({book, handleClick2}) {

	const date = new Date();
	const dateText = new Date(book.createdAt);
	
	function getDate() {
	  const betweenTime = Math.round(Math.round(date.getTime() - dateText.getTime())/1000/60);
	  if (betweenTime < 1) return '방금전';
	  if (betweenTime < 60) {
		return `${betweenTime}분전`;
	  }
	  const betweenTimeHour = Math.round(betweenTime / 60);
	  if (betweenTimeHour < 24) {
		return `${betweenTimeHour}시간전`;
	  }
	  const betweenTimeDay = Math.round(betweenTime / 60 / 24);
	  if (betweenTimeDay < 365) {
		return `${betweenTimeDay}일전`;
	  }
	  const betweenTimeMonth = Math.round(betweenTime / 60 / 24/ 30);
	  if (betweenTimeMonth < 12) {
		return `${betweenTimeMonth}개월 전`;
	  }
	  return `${Math.round(betweenTimeDay / 365)}년전`;
	}

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
							<p className={style.bookDetail01}>{book.user.name}({book.user.region})</p>
							<p className={`${style.bookDetail01} ${style.bookDetail02}`}>
								{getDate()}
							</p>
						</div>
						<button onClick={handleClick2} className={style.xIconbox}>
                        <img className={style.xicon} src={xIcon} alt='xicon' />
                        </button>
						<div className={style.grade}>{book.conditions}</div>
					</div>
				</div>
			</div>
			
		</>
	);
};

export default BSlist;
