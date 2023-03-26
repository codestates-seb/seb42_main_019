import style from './Mcontent.module.css';

function Mcontent({message, setMessage}) {
	return (
		<>
			<div className={style.box1}>
				<div className={style.notFooter1}>
					<div className={style.listboxMessage1}>
					<textarea className={style.mtextarea} type='text' value={message} onChange={e=>setMessage(e.target.value)}/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Mcontent;
