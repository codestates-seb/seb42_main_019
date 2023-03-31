import style from './BookList.module.css';
import bookdata from '../../dummyData/SB/bookData';
import classNames from 'classnames/bind';

function BookList() {
	const cx = classNames.bind(style);

	return (
		<>
			{bookdata.map((el)=>{
				return(
					<>
					<div className={cx('box1')}>
				<div className={cx('notFooter')}>
					<div className={cx('listBoxMessage')}>
						<div className={cx('bookImg1')}>
							<img className={cx('img1')} src={el.thumbnail} alt='bookcover' />
						</div>
						<div className={cx('bookTitle')}>
							<p className={cx('bookTitleP')}>{el.title}</p>
						</div>
						<div className={cx('bookDetail1')}>
							<p className={cx('bookDetail01')}>{el.name}({el.region})</p>
							<p className={`${cx('bookDetail01'), cx('bookDetail02')}`}>
								{el.time}시간 전
							</p>
						</div>
					</div>
				</div>
			</div>
					</>
				)
			})}
		</>
	);
}

export default BookList;

