import style from './MessageList3.module.css';
import classNames from 'classnames/bind';
import {useState } from 'react';

function MessageList3({messageContent1}) {
	const cx = classNames.bind(style);
	const [isOn, setIsOn] = useState(false);

	const handleToggle = ()=>{
		setIsOn(!isOn);
		localStorage.setItem('isOn', JSON.stringify(setIsOn));
	};


		

	return (
		
		
			<>
			<div className={cx('all')} onClick={handleToggle} key={messageContent1.id}>
				<div className={cx('box1')}>
					<p className={cx('name', { 'clicked': isOn })}>{messageContent1.name}</p>
					<p className={cx('content', { 'clicked': isOn })}> {messageContent1.content}</p>
				</div>
				<p className={cx('date', { 'clicked': isOn })} >{messageContent1.date}</p>
			</div>
			</>
		
		
		
		);
	}
	
	export default MessageList3;
