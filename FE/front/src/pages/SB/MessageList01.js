import Header2 from '../../components/common/Header2';
import style from './MessageList01.module.css'
import Nav from '../../components/common/Nav';
import MessageList2 from '../../components/JSB/message/MessageList2';

const MessageList01 = () => {
    return(
        <>
        <Header2>메시지</Header2>
        <div className={style.mloneBody}>
        <MessageList2 />
        <MessageList2 />
        <MessageList2 />
        </div>
        <Nav />
        </>
    )
}

export default MessageList01;