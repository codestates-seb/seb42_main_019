import style from './MessageList3.module.css';
import classNames from 'classnames/bind';

function MessageList3({messages}) {
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
			</div>
			</>
		);
	}
	
	export default MessageList3;
