import style from './Profile.module.css';
import {FiThumbsDown} from 'react-icons/fi';
import {FiThumbsUp} from 'react-icons/fi';
import api from '../../api/api';
import { useEffect, useState } from 'react';

function MessageList1({profile, bookInfo}) {

	const userId = profile.userId;

	const [voteClick, setVoteClick] = useState(false);

	useEffect(() => {
		bookInfo();
	}, [voteClick])

	const voteUp = async() => {
		const url = `user/${userId}/like`;
		try{
			await api ({
				method: 'post',
				url,
			})
			setVoteClick(!voteClick);
		} catch(err){
			if(err.response){
				alert('이미 참여하셨습니다.')
			}
			console.log(err.response)
		}
	};
	
	const voteDown = async() => {
		const url = `user/${userId}/dislike`;
		try{
			await api ({
				method: 'post',
				url,
			})
			setVoteClick(!voteClick);
		} catch(err){
			if(err.response){
				alert('이미 참여하셨습니다.')
			}
			console.log(err)
		}
	};

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
						{/* Vote */}
						<div className={style.messageVote}>
							<div className={style.voteUp} onClick={voteUp}>
								<FiThumbsUp className={style.voteUp} size="20" color="#2f5a2d"/>
								<span className={style.voteSpan}>{profile.likeCount}</span>
							</div>
							<div className={style.voteDown} onClick={voteDown}>
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
