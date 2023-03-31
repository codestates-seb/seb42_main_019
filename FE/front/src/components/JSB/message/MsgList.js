import style from './MsgList.module.css';

function MsgList() {
	return (
		<>
			<div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.profileContent}>
							<div className={style.profileName}>우히힛</div>
							<div className={style.messageDate}>2023.03.10</div>
						</div>
						<div className={style.message}>
							개발자의 개발괴발 우하하히헤히히함하키ㅏㄴㅎ이
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MsgList;
