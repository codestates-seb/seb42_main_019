import { Link } from 'react-router-dom';
import { useState } from 'react';

import style from './ReceivedMessages.module.css'
import classNames from 'classnames';

import Nav from '../../components/common/Nav';
import Header2 from '../../components/common/Header2';
import MessageList3 from '../../components/JSB/message/MessageList3';

import messageContent1 from '../../dummyData/SB/messageContent1';

const ReceivedMessages = () => {
    const cx = classNames.bind(style)
	const [isOn, setIsOn] = useState(false);
	const handleToggle = ()=>{
		setIsOn(!isOn);
		localStorage.setItem('isOn', JSON.stringify(setIsOn));
	};
 
    return(
        <>
        <Header2>메세지</Header2>
        
            <div onClick={handleToggle}  className={cx('map', { 'clicked': isOn })}>
            {messageContent1.map((el)=> 
                <Link to={`/myPage/messageBox/${el.id-1}`}>
                <MessageList3 key={el.id} messageContent1={el}/>
                </Link>)}
            </div>
        
        <Nav />
        </>
    )
}

export default ReceivedMessages;