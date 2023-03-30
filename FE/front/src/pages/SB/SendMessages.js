import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/api';

import style from './ReceivedMessages.module.css';

import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav'

const SendMessages = () =>{
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    // const getMessages = async () => {
    //     try {
    //     const response = await axios.get(`/messages/sent/?pageNumber=1&size=10&sort=create_date_time,DESC`);
    //     const messagesData = response.data.data;
    //     setMessages(messagesData);
    //     console.log('Messages received successfully', messagesData);
    //     } catch (error) {
    //     console.error('Error getting messages', error);
    //     }
    // };

    // getMessages();
    // }, []);

    console.log(messages);

    const message = function(){
        if(messages.length === 0){
            return true
        }else {
            return false
        }
    }

    return (
    <div>
        <Header2>보낸 메세지</Header2>
        <div className={style.map}>
            {message() ? <p> No DATA </p>
        :
        messages.map((message) => (
            <Link to={`/myPage/messageBox/myView/${message.id-1}`}>
            <p key={message.id}>{message.content}</p>
            </Link>
            ))
        }
        </div>
        <Nav />
    </div>
        );
}

export default SendMessages;
