import { useParams } from 'react-router-dom';

import style from './MessageRS.module.css'
import classNames from 'classnames/bind';

import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';

import messageContent1 from '../../dummyData/SB/messageContent1';

const MessageSend=()=>{
    const cx = classNames.bind(style);
    const params = useParams();
    const profile = messageContent1[params.id];


    return(
        <>
        <Header2>보낸 메시지</Header2>
        <div className={cx('messageBoxV')}>
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

export default MessageSend;