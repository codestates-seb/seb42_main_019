import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/api';

import style from './MessageRS.module.css'
import classNames from 'classnames/bind';

import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';
import MessageList1 from '../../components/JSB/message/MessageList1'

const MessageReceive=()=>{
    const cx = classNames.bind(style);
    const params = useParams();
    const messageId = params.id;


    const [messageReceive, setMessageReceive] = useState(null);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = await axios.get(`/messages/messages/${messageId}`);
                const messageData = response.data.data;
                setMessageReceive(messageData);
                console.log('Message received successfully', messageData);
            } catch (error) {
                console.error('Error getting message', error);
            }
        };
    
        getMessage();
    }, []);


    return(
        <>
        <Header2>받은 메시지</Header2>
        <div className={cx('messageBoxV')}>
            <p className={cx('mvtext')}>보낸 사람</p>
            <MessageList1 />
            <p className={cx('mvtext')}>메시지 내용</p>
            <div className={cx('viewContent')}>
                            <div key={messageReceive.messageId.id} className={cx('viewContent2')}>
                            {messageReceive.content}
                            </div>
            </div>
            <Button>메시지 답장하기</Button>
        </div>
        </>
    )
}

export default MessageReceive;