import style from './AlertList.module.css';

const AlertList = function () {
	return (
		<>
			<div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.alertMessage1}>
							<p className={style.alertMessage01}>메시지가 도착하였습니다.</p>
						</div>
						<div className={style.alertBtn1}>
							<div className={style.alertBtnText}>메시지 확인</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AlertList;
