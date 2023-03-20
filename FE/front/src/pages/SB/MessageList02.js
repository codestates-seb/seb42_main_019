import Header2 from '../../components/common/Header2';
import style from './MessageList02.module.css'
import Nav from '../../components/common/Nav';
import MessageList3 from '../../components/JSB/message/MessageList3';
import classNames from 'classnames';
import messageContent1 from '../../dummyData/SB/messageContent1';
import { Link } from 'react-router-dom';

const MessageList02 = () => {
    const cx = classNames.bind(style)

    return(
        <>
        <Header2>메세지</Header2>
        
            <div className={cx('map')}>
            {messageContent1.map((el)=> 
                <Link to={`/myPage/messageBox/${messageContent1.id}`}>
                <MessageList3 key={el.id} messageContent1={el}/>
                </Link>)}
            </div>
        
        <Nav />
        </>
    )
}

export default MessageList02;