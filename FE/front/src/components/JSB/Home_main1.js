import style from './Home_main1.module.css';
import BookListBox from '../common/BookList.js';

const Home_main1 = function () {
	return (
		<>
			<div className={style.text1}>
				<p>오늘 읽고 싶은 책?</p>
			</div>
			<div className={style.notFooter}>
				<input className={style.listboxMessage}></input>
			</div>
			<BookListBox />
		</>
	);
};

export default Home_main1;
