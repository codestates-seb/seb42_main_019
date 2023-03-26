/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import style from './MessageWrite.module.css'
import classNames from 'classnames';
import axios from 'axios';
import Button from '../../components/common/Button';
import MessageList1_ from '../../components/JSB/message/MessageList1_';
import { useParams } from 'react-router-dom';
import Header2 from '../../components/common/Header2';
import BS2 from '../../components/JSB/BookShelf/BS2';


function MessageWrite() {
    const cx = classNames.bind(style)
    const params = useParams();
    const [sendMessage, setSendMessage] = useState({});
    const book = sendMessage[params.id]

  // useState로 데이터 저장

  // useEffect로 API GET 요청하고 데이터 받아오기
    useEffect(() => {
    const fetchData = async () => {
        try {
        const result = await axios.get(`http://ec2-3-35-22-107.ap-northeast-2.compute.amazonaws.com:8080/messages`);
        setSendMessage(result.data);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };
    fetchData();
    }, [params.id]);
    
    const [formData, setFormData] = useState({
    content: ""
    });
    
    const handleMessageSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const response = await axios.post(`http://ec2-3-35-22-107.ap-northeast-2.compute.amazonaws.com:8080/message/${receiver.id}`, {
        content: ""
        });
        alert('메세지가 전송되었습니다!');
        console.log('Message sent successfully', response.data);
    } catch (error) {
        alert('메세지를 다시 보내볼까요?')
        console.error('Error sending message', error);
    }
    };
    
    
    
    return (
        <div>
        <Header2>발신메세지</Header2>
        <BS2 book={book}/>
        <p className={cx('mvtext')}>받는 사람</p>
        <MessageList1_ sendMessage={sendMessage} />
        <div>
        <textarea onChange={(e) => setFormData({...formData, content: e.target.value})} />
        <Button type="submit" onClick={handleMessageSubmit}>메세지 보내기</Button>
        </div>
        </div>
        );
    }
    
    export default MessageWrite;