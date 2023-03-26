import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header2 from '../../components/common/Header2';
import style from './MessageList02.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../../components/common/Nav'

const MessageList01 = () =>{
    const history = useNavigate();
    const [messages, setMessages] = useState([]);

    const handleClick2 = (id)=>{
    const updatedList = []
    setMessages(updatedList);
    localStorage.setItem('messages',JSON.stringify(updatedList));
    history('/myPage/messageBox1');
    }

    useEffect(() => {
    const getMessages = async () => {
        try {
        const response = await axios.get('http://izones3.s3-website.ap-northeast-2.amazonaws.com/api/messages');
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

export default MessageList01;
