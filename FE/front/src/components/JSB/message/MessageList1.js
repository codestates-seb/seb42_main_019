import style from './MessageList1.module.css';
import {FiThumbsDown} from 'react-icons/fi';
import {FiThumbsUp} from 'react-icons/fi';

function MessageList1({profile}) {


	return (
		<>
			<div className={style.box1}>
				<div className={style.notFooter}>
					<div className={style.listboxMessage}>
						<div className={style.profileMessageBox}>
							<img src={`https://api.dicebear.com/5.x/bottts-neutral/svg`} className={style.profileMessage} alt="key"/>
						</div>
						<div className={style.profileContent}>
							<div className={style.profileName}>{profile.name}</div>
							<div className={style.message}>
							{profile.region}
							</div>
						</div>
						<div className={style.messageVote}>
							<div className={style.voteUp}>
							<FiThumbsUp className={style.voteUp} size="20" color="#2f5a2d"/>
							<span className={style.voteSpan}>{profile.likeCount}</span>
							</div>
							<div className={style.voteDown}>
							<FiThumbsDown className={style.voteDown} size="20" color="#999999"/>
							<span className={style.voteSpan}>{profile.dislikeCount}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MessageList1;
