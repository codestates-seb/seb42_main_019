import classNames from 'classnames/bind';
import style from './BSlist.module.css';

const BS = function ({ bookData }) {
	const cx = classNames.bind(style)
	const authors = bookData.authors.join(', ');
	const userOn = () => {
		if(bookData.user) return true;
		return false;
	}

	return (
		<>
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
								{bookData.time}시간 전
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
		</>
	);
};

export default BS;
