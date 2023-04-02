import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/api';

import style from './ReceivedMessages.module.css';
import classNames from 'classnames';


import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav'
import SendMessage from '../../components/JSB/message/SendMessage';
import Pagenation from '../../components/common/Pagenation';

const SendMessages = () =>{
    const cx = classNames.bind (style)
    const [sendMessages, setSendMessages] = useState([]);

    useEffect(() => {
    const getMessages = async () => {
        try {
        const response = await axios.get(`/messages/sent/?pageNumber=1&size=7&sort=create_date_time,DESC`);
        const messagesData = response.data.data;
        setSendMessages(messagesData);
        } catch (error) {
        console.error('Error getting messages', error);
        }
    };

    getMessages();
    }, []);


    const handleDeleteSendMessage = async(messageId)=>{
        try{
            const response = await axios.delete(`/messages/${messageId}`);
            console.log("response.data", response.data);
            window.location.reload();
        }catch(error){
            console.log(error);
        }
    }


    return (
    <div>
        <Header2>보낸 메세지</Header2>
        <div className={cx('map')}>
        {sendMessages.map((item, index)=>
            <Link key={item.messageId} to={`/myPage/sendMessageBox/${index}`}>
                <SendMessage handleDeleteSendMessage={()=>handleDeleteSendMessage(item.messageId)} key={item.id} item={item} />
            </Link>
            )}
        </div>
        <Pagenation />
        <Nav />
    </div>
        );
}

export default SendMessages;
