import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/api';

import style from './MessageRS.module.css'
import classNames from 'classnames/bind';

import Header2 from '../../components/common/Header2';
import MessageList1 from '../../components/JSB/message/MessageList1';
import Nav from '../../components/common/Nav'

const MessageSend=()=>{
    const cx = classNames.bind(style);
    const params = useParams();
    const messageId = params.id;
    const profile = params.id;

    const [messageSend, setMessageSend] = useState([]);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = await axios.put(`/messages/messages/${messageId}`);
                const messageData = response.data;
                console.log(messageData)
                setMessageSend(messageData);
                console.log('Message received successfully', messageData);
            } catch (error) {
                console.error('Error getting message', error);
            }
        };
    
        getMessage();
    }, []);

//파람스로 메세지 아이디 받아와서 그 정보로 유저정보 뽑아오고 메세지 내용뽑아와야 함.
    
    console.log(messageSend)
    return(
        <>
        <Header2>보낸 메시지</Header2>
        <div className={cx('messageBoxV')}>
        <p className={cx('mvtext')}>받는 사람</p>
            <MessageList1 profile={profile} />
            <p className={cx('mvtext')}>메시지 내용</p>
            <div className={cx('viewContent')}>
                <div key={messageId} className={cx('viewContent2')}>
                {params.id.content}
                </div>
            </div>
        </div>
        <Nav />
        </>
    )
}

export default MessageSend;