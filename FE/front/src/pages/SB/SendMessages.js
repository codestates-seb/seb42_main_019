import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/api';

import style from './ReceivedMessages.module.css';
import classNames from 'classnames/bind';


import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav'
import SendMessage from '../../components/JSB/message/SendMessage';
import Pagenation from '../../components/common/Pagenation';

const SendMessages = () =>{
    const cx = classNames.bind (style)
    const [sendMessages, setSendMessages] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [currentPage, setCurrentPage] =useState(1);

    const getMessages = async () => {
        try {
            const response = await axios.get(`/messages/sent/?pageNumber=${currentPage}&size=7&sort=create_date_time,DESC`);
            const messagesData = response.data.data;
            setSendMessages(messagesData);
            setPageInfo(response.data.pageInfo);
        } catch (error) {
            console.error('Error getting messages', error);
        }
    };

    useEffect(() => {
        getMessages();
    }, []);

    useEffect(() => {
        getMessages();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const handleDeleteSendMessage = async(messageId)=>{
        try{
            const response = await axios.delete(`/messages/${messageId}`);
            // window.location.reload();
        }catch(error){
            console.log(error);
        }
    }


    return (
        <main className={cx('main')}>
            <Header2>보낸 메세지</Header2>
            <div className={cx('map')}>
            {sendMessages.map((item, index)=>
                <Link key={item.messageId} to={`/myPage/sendMessageBox/${index}`}>
                    <SendMessage handleDeleteSendMessage={()=>handleDeleteSendMessage(item.messageId)} key={item.id} item={item} />
                </Link>
                )}
            </div>
            <Pagenation
                pageInfo = {pageInfo}
                currentPage = {currentPage}
                onPageChange = {handlePageChange}
            />
            <Nav />
        </main>
        );
}

export default SendMessages;
