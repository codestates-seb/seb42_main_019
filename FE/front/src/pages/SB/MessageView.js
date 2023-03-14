import style from './MessageView.module.css'
import Header2 from '../../components/common/Header2';
import MessageList1 from '../../components/JSB/message/MessageList1'
import BookList from '../../components/common/BookList'
import Button from '../../components/common/Button';

const MessageView=()=>{
    return(
        <>
        <Header2>수신메시지</Header2>
        <div className={style.messageBoxV}>
        <BookList />
        <p className={style.mvtext}>보낸 사람</p>
        <MessageList1 />
        <p className={style.mvtext}>메시지 내용</p>
        <div className={style.viewContent}>
        <div className={style.viewContent2}>
        dsfdsfdsfsdf
        </div>
        </div>
        <Button>메시지 답장하기</Button>
        </div>
        </>
    )
}

export default MessageView;