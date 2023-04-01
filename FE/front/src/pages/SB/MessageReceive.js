import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/api';

import style from './MessageRS.module.css'
import classNames from 'classnames/bind';

import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';
import MessageList4 from '../../components/JSB/message/MessageList4'

const MessageReceive=()=>{
    const cx = classNames.bind(style);
    const params = useParams();
    const messageId = params.id;


    const [messageReceive, setMessageReceive] = useState(null);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = await axios.get(`/messages/received/?pageNumber=1&size=10&sort=create_date_time,DESC`);
                const messageData = response.data.data[messageId];
                console.log(messageId)
                console.log(messageData)
                console.log(response.data.data)
                setMessageReceive(messageData);
                console.log('Message received successfully', messageData);
            } catch (error) {
                console.error('Error getting message', error);
            }
        };
    
        getMessage();
    }, []);


    if(messageReceive === null){
        return <p>isLoading</p>
    }else {
        return(
            <>
            <Header2>받은 메시지</Header2>
            <div className={cx('messageBoxV')}>
                <p className={cx('mvtext')}>보낸 사람</p>
                <MessageList4 messageReceive={messageReceive}/>
                <p className={cx('mvtext')}>메시지 내용</p>
                <div className={cx('viewContent')}>
                    <div key={messageId} className={cx('viewContent2')}>
                    {messageReceive.content}
                    </div>
                </div>
                <Link to={`/myPage/messageBox/write/${messageReceive.messageId}`}>
                <Button>메시지 답장하기</Button>
                </Link>
            </div>
            </>
        )
    }
}

export default MessageReceive;