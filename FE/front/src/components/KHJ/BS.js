import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './BSlist.module.css';

const BS = function ({ bookData }) {
	const cx = classNames.bind(style)
	const authors = bookData.authors.join(', ');
	const userOn = () => {
		if(bookData.user) return true;
		return false;
	}

	const date = new Date();
	const dateText = new Date(bookData.createdAt);
	
	function getDate() {
	  const betweenTime = (Math.round((date.getTime() - dateText.getTime() - 32400000)/1000/60));
	  if (betweenTime < 1) return '방금 전';
	  if (betweenTime < 60) {
		return `${betweenTime}분전`;
	  }
	  const betweenTimeHour = Math.round(betweenTime / 60);
	  if (betweenTimeHour < 24) {
		return `${betweenTimeHour}시간 전`;
	  }
	  const betweenTimeDay = Math.round(betweenTime / 60 / 24);
	  if (betweenTimeDay < 365) {
		return `${betweenTimeDay}일 전`;
	  }
	  const betweenTimeMonth = Math.round(betweenTime / 60 / 24/ 30);
	  if (betweenTimeMonth < 12) {
		return `${betweenTimeMonth}개월 전`;
	  }
	  return `${Math.round(betweenTimeDay / 365)}년 전`;
	}

	return (
		<Link to ={`/customer/detailView/${bookData.bookId}`} key={bookData.bookId}>
        	<div className={cx('box1')}>
				<div className={cx('notFooter')}>
					<div className={cx('listboxMessage')}>
						<div className={cx('bookimg1')}>
							<img key={bookData.id} className={cx('img1')} src={bookData.thumbnail} alt='bookcover' />
						</div>
						<div className={cx('bookTitle')}>
							<p className={cx('bookTitlep')}><b>{bookData.title}</b></p>
						</div>
						<div className={cx('bookDetail1')}>
							<p className={cx('bookDetail01')}>
								{userOn() ?
									`${bookData.user.name}(${bookData.user.region})`
									: authors
								}
							</p>
							<p className={cx('bookDetail01', 'bookDetail02')}>
							{getDate()}
							</p>
						</div>
						{userOn() ?
							<div className={style.grade}>{bookData.condition}</div>
							:
							null
						}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default BS;
