import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/api';

import style from './MessageRS.module.css'
import classNames from 'classnames/bind';

import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav'
import MessageList5 from '../../components/JSB/message/MessageList5';
import Loading from '../HJ/Loading';

const MessageSend=()=>{
    const cx = classNames.bind(style);
    const params = useParams();
    const messageId = params.id;

    const [messageSend, setMessageSend] = useState(null);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = await axios.get(`messages/sent/?pageNumber=1&size=10&sort=create_date_time,DESC`);
                const messageData = response.data.data[messageId];
                setMessageSend(messageData);
            } catch (error) {
                console.error('Error getting message', error);
            }
        };
    
        getMessage();
    }, []);

//파람스로 메세지 아이디 받아와서 그 정보로 유저정보 뽑아오고 메세지 내용뽑아와야 함.
    
    if(messageSend === null){
        return <Loading />
    }else {
        return(
            <>
            <Header2>보낸 메시지</Header2>
            <div className={cx('messageBoxV')}>
            <p className={cx('mvtext')}>받는 사람</p>
            <Link to={`/userRateMsg/${messageId}`}>
                <MessageList5 messageSend={messageSend} />
            </Link>
            <p className={cx('mvtext')}>메시지 내용</p>
            <div className={cx('viewContent')}>
                <div key={messageId} className={cx('viewContent2')}>
                {messageSend.content}
                </div>
            </div>
            </div>
            <Nav />
            </>
        )
    }
}

export default MessageSend;
