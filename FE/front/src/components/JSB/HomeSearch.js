import style from './HomeSearch.module.css';

const HomeSearch = function () {
	return (
		<>
			<div className={style.text1}>
				<p>오늘 읽고 싶은 책?</p>
			</div>
			<div className={style.notFooter}>
				<input className={style.listboxMessage}></input>
			</div>
		</>
	);
};

export default HomeSearch;
