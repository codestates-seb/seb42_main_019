import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/api';

import style from './ReceivedMessages.module.css';

import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav'
import SendMessage from '../../components/JSB/message/SendMessage';

const SendMessages = () =>{
    const [sendMessages, setSendMessages] = useState([]);

    useEffect(() => {
    const getMessages = async () => {
        try {
        const response = await axios.get(`/messages/sent/?pageNumber=1&size=7&sort=create_date_time,DESC`);
        const messagesData = response.data.data;
        setSendMessages(messagesData);
        console.log('Messages received successfully', messagesData);
        } catch (error) {
        console.error('Error getting messages', error);
        }
    };

    getMessages();
    }, []);
    return (
    <div>
        <Header2>보낸 메세지</Header2>
        <div className={style.map}>
        {sendMessages.map((item)=>
            <Link key={item.id} to={`/myPage/sendMessageBox/${item.messageId}`}>
                <SendMessage item={item} />
            </Link>
            )}
        </div>
        <Nav />
    </div>
        );
}

export default SendMessages;
