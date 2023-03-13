import style from './AlertListMs.module.css';

const AlertListMS = function () {
	return (
		<>
			<div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.alertMessage1}>
							<p className={style.alertMessage01}>
								권은비님이 책 교환 요청을 신청하였습니다.
							</p>
						</div>
						<div className={style.alertBtn1}>
							<div className={style.alertBtnText}>요청사항 보기</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AlertListMS;
