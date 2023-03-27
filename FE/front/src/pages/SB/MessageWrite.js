/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/api';

import style from './MessageWrite.module.css'
import classNames from 'classnames';

import Button from '../../components/common/Button';
import Header2 from '../../components/common/Header2';
import BS2 from '../../components/JSB/BookShelf/BS2';
import MessageList_write from '../../components/JSB/message/MessageList_write';

//1. 로그인한 사람 유저 본인만 접근 가능 ( )
//2. 메세지 받는 사람의데이터 get 요청 ( )
//   1. 메세지데이터의 받는 사람 데이터로 MessagesList1에 데이터 전달 ( )
//3. textarea에 상태가 바뀐 formData를 post 요청보내야 함. ( )

//? 맨 처음 메세지를 시작할 때는 어떻게 받는 사람 정보를 가져오지?

function MessageWrite() {
    const cx = classNames.bind(style)
    const params = useParams();
    const [sendMessage, setSendMessage] = useState({});
    const book = sendMessage[params.id]
    const [formData, setFormData] = useState({
    content: ""
    });
    
    const handleMessageSubmit = async (event) => {
    event.preventDefault();
    
    // const response = await axios.post(`${api}/message/${받는사람id}`
    try {
        const response = await axios.post(`${api}/message`, {
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
            <MessageList_write sendMessage={sendMessage} />
            <div>
                <textarea onChange={(e) => setFormData({...formData, content: e.target.value})} />
                <Link to={'/myPage/messageBox/messages'}>
                    <Button type="submit" onClick={handleMessageSubmit}>메세지 보내기</Button>
                </Link>
            </div>
        </div>
        );
    }
    
    export default MessageWrite;