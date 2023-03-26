import style from './MessageView.module.css'
import Header2 from '../../components/common/Header2';
import MessageList1 from '../../components/JSB/message/MessageList1'
import Button from '../../components/common/Button';
import classNames from 'classnames/bind';
import messageContent1 from '../../dummyData/SB/messageContent1';
import { useParams } from 'react-router-dom';

const MessageView=()=>{
    const cx = classNames.bind(style);
    const params = useParams();
    const profile = messageContent1[params.id];


    return(
        <>
        <Header2>수신메시지</Header2>
        <div className={cx('messageBoxV')}>
            <p className={cx('mvtext')}>보낸 사람</p>
            <MessageList1 />
            <p className={cx('mvtext')}>메시지 내용</p>
            <div className={cx('viewContent')}>
                            <div key={profile.id} className={cx('viewContent2')}>
                            {profile.content}
                            </div>
            </div>
            <Button>메시지 답장하기</Button>
        </div>
        </>
    )
}

export default MessageView;