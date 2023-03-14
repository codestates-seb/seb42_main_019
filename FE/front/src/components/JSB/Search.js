import style from './Search.module.css';

const HomeSearch = function () {
	return (
		<>
			<div className={style.notFooter}>
				<input className={style.listboxMessage}></input>
			</div>
		</>
	);
};

export default HomeSearch;
