import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/api';

import style from './ReceivedMessages.module.css';
import classNames from 'classnames/bind';

import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav'

const SendMessages = () =>{
    const history = useNavigate();
    const [messages, setMessages] = useState([]);

    const handleClick2 = ()=>{
    const updatedList = []
    setMessages(updatedList);
    localStorage.setItem('messages',JSON.stringify(updatedList));
    history('/myPage/messageBox1');
    }

    useEffect(() => {
    const getMessages = async () => {
        try {
        const response = await axios.get(`${api}/messages/sent/?pageNumber=1&size=10&sort=create_date_time,DESC`);
        const messagesData = response.data;
        setMessages(messagesData);
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
        <div onClick={()=>{handleClick2(messages.id)}} className={style.box1}>
            <div className={style.notFooter}>
                <div className={style.listboxMessage}> Delete All Message! </div>
            </div>
        </div> 
        <div className={style.map}>
            {messages.map((message) => (
                <Link to={`/myPage/messageBox/myView/${message.id-1}`}>
                <p key={message.id}>{message.text}</p>
                </Link>
                ))}
        </div>
        <Nav />
    </div>
        );
}

export default SendMessages;
