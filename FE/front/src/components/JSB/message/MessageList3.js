import style from './MessageList3.module.css';
import classNames from 'classnames/bind';

function MessageList3({received}) {
	const cx = classNames.bind(style);

	return (	
			<>
			<div className={cx('all')} key={received.messageId}>
				<div className={cx('box1')}>
					<p className={cx('name')}>{received.sender.name}</p>
					<p className={cx('content')}> {received.sender.content}</p>
				</div>
				<p className={cx('date')} >{received.sender.date}</p>
			</div>
			</>
		);
	}
	
	export default MessageList3;
