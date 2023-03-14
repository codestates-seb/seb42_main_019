import style from './Mcontent.module.css';

function Mcontent() {
	return (
		<>
			<div className={style.box1}>
				<div className={style.notFooter1}>
					<div className={style.listboxMessage1}>
					<textarea className={style.mtextarea}/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Mcontent;
