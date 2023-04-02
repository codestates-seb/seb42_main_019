import style from './MessageList3.module.css';
import classNames from 'classnames/bind';
import xIcon from '../../../assets/xIcon.png';

function MessageList3({messages, handleDeleteReceivedMessage}) {
	const cx = classNames.bind(style);

	return (
			<>
			<div className={cx('all')} key={messages.id}>
				<div className={cx('miniBox')}>
				<p className={cx('date')} >{messages.date}</p>
					<div className={cx('box1')}>
					
						<p className={cx('name')}>{messages.sender.name}</p>
						<p className={cx('content')}> {messages.content}</p>
					</div>
					
				</div>
				<button onClick={(e)=>{handleDeleteReceivedMessage(); e.preventDefault();
				}} className={style.xIconbox}>
				<img className={style.xicon} src={xIcon} alt='xicon' />
				</button>
			</div>
			</>
		);
	}
	
	export default MessageList3;


