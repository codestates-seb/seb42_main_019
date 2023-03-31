import style from './BSlist.module.css';

const BS2 = function ({ book }) {



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
							<p className={style.bookDetail01}>{book.authors}</p>
							<p className={`${style.bookDetail01} ${style.bookDetail03}`}>
							{book.publisher}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BS2;
