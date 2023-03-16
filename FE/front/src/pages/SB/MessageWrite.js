import style from './MessageWrite.module.css'
import Header2 from '../../components/common/Header2';
import MessageList1 from '../../components/JSB/message/MessageList1'
import BookList from '../../components/common/BookList'
import Mcontent from '../../components/JSB/message/Mcontent';
import Button from '../../components/common/Button';
import classNames from 'classnames/bind';

const MessageWrite=()=>{
    const cx = classNames.bind(style);

    return(
        <>
        <Header2>발신메시지</Header2>
        <div className={cx('messageBox')}>
            <BookList />
            <p className={cx('mltext')}>받는 사람</p>
            <MessageList1 />
            <p className={cx('mltext')}>메시지 내용</p>
            <Mcontent />
            <Button>메시지 보내기</Button>
        </div>
        </>
    )
}

export default MessageWrite;