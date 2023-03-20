import style from './MessageList1.module.css';
import {FiThumbsDown} from 'react-icons/fi';
import {FiThumbsUp} from 'react-icons/fi';
import key from '../../../assets/key.jpg'

function MessageList1() {



	return (
		<>
			<div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.profileMessageBox}>
							<img src={key} className={style.profileMessage} alt="key"/>
						</div>
						<div className={style.profileContent}>
							<div className={style.profileName}>저녁밥추천받는다ㄱ</div>
							<div className={style.message}>
							부산시
							</div>
						</div>
						<div className={style.messageVote}>
							<div className={style.voteUp}>
							<FiThumbsUp className={style.voteUp} size="20" color="#2f5a2d"/>
							<span className={style.voteSpan}>292</span>
							</div>
							<div className={style.voteDown}>
							<FiThumbsDown className={style.voteDown} size="20" color="#999999"/>
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
