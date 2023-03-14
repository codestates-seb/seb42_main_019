import Header2 from '../../components/common/Header2'
import style from './MessageList01.module.css'
import Nav from '../../components/common/Nav';
import MessageList3 from 'src/components/JSB/message/MessageList3';

const MessageList02 = () => {
    return(
        <>
        <Header2>메시지</Header2>
        <div className={style.mloneBody}>
        <MessageList3 />
        </div>
        <Nav />
        </>
    )
}

export default MessageList02;