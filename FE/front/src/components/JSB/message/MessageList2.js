import style from './MessageList1.module.css';
import izone from '../../../assets/izonelogo1.jpg';
import bookcover from '../../../assets/bookcover.png';

function MessageList2() {
	return (
		<>
			<div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.profileMessageBox}>
							<img className={style.profileMessage} src={izone} alt='izone' />
						</div>
						<div className={style.profileContent}>
							<div className={style.profileName}>우히힛</div>
							<div className={style.message}>
								안녕하세요 반갑습니다 어쩌고저쩌고네네네네네네
							</div>
						</div>
						<div>
							<img
								className={style.bookCover}
								src={bookcover}
								alt='book-cover'
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MessageList2;
