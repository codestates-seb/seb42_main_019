import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/api';

import style from './MessageRS.module.css'
import classNames from 'classnames/bind';

import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';

const MessageSend=()=>{
    const cx = classNames.bind(style);
    const params = useParams();
    const messageId = params.id;

    const [messageSend, setMessageSend] = useState(null);

    console.log(messageId);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = await axios.put(`/messages/messages/${messageId}`);
                const messageData = response.data;
                setMessageSend(messageData);
                console.log('Message received successfully', messageData);
            } catch (error) {
                console.error('Error getting message', error);
            }
        };
    
        getMessage();
    }, []);
    
    console.log(messageSend)
    return(
        <>
        <Header2>보낸 메시지</Header2>
        <div className={cx('messageBoxV')}>
            <p className={cx('mvtext')}>메시지 내용</p>
            <div className={cx('viewContent')}>
                            <div key={messageSend.messageId.id} className={cx('viewContent2')}>
                            {messageSend.content}
                            </div>
            </div>
            <Button>메시지 답장하기</Button>
        </div>
        </>
    )
}

export default MessageSend;