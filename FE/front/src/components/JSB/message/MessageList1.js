import style from './MessageList1.module.css';
import izone from '../../../assets/izonelogo1.jpg';
import {FiThumbsDown} from 'react-icons/fi';
import {FiThumbsUp} from 'react-icons/fi';

function MessageList1() {
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
							부산시
							</div>
						</div>
						<div className={style.messageVote}>
							<div className={style.voteUp}>
							<button className={style.voteUp} onClick={()=>{console.log(3)}} ><FiThumbsUp size="20" color="#2f5a2d"/></button>
							<span className={style.voteSpan}>292</span>
							</div>
							<div className={style.voteDown}>
							<button className={style.voteDown} onClick={()=>{console.log(4)}} ><FiThumbsDown size="20" color="#999999"/></button>
							<span className={style.voteSpan}>4024</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MessageList1;
