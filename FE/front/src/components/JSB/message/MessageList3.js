import {useState } from 'react';

import style from './MessageList3.module.css';
import classNames from 'classnames/bind';

function MessageList3({messages}) {
	const cx = classNames.bind(style);
	const [isOn, setIsOn] = useState(false);

	const handleToggle = ()=>{
		setIsOn(!isOn);
		localStorage.setItem('isOn', JSON.stringify(setIsOn));
	};




	return (
		
		
<>
<div className={cx('all')} onClick={handleToggle} key={messages.id}>
	<div className={cx('box1')}>
		<p className={cx('name', { 'clicked': isOn })}>{messages.name}</p>
		<p className={cx('content', { 'clicked': isOn })}> {messages.content}</p>
	</div>
	<p className={cx('date', { 'clicked': isOn })} >{messages.date}</p>
</div>
</>
		
		
		
		);
	}
	
	export default MessageList3;
