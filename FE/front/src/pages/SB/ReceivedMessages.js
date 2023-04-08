import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/api'

import style from './ReceivedMessages.module.css'
import classNames from 'classnames/bind';

import Nav from '../../components/common/Nav';
import Header2 from '../../components/common/Header2';
import MessageList3 from '../../components/JSB/message/MessageList3';
import Pagenation from '../../components/common/Pagenation';


const ReceivedMessages = () => {
    const cx = classNames.bind(style)
    const [messages, setMessages] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [currentPage, setCurrentPage] =useState(1);

    const fetchReceived = async () =>{
        try {
            const response = await axios.get(`/messages/received/?pageNumber=${currentPage}&size=7&sort=create_date_time,DESC`);
            const data = response.data.data
            const page = response.data.pageInfo.totalPages
            setMessages(data);
            setPageInfo(response.data.pageInfo)
        }catch(error){
            console.error('error is Here', error);
        }
    }
    useEffect(()=>{
        fetchReceived();
    }, [currentPage]);

    const handleDeleteReceivedMessage = async(messageId)=>{
        try{
            const response = await axios.delete(`/messages/${messageId}`);
            window.location.reload();
        }catch(error){
            console.log(error)
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
 
    return(
        <main className={cx('main')}>
            <Header2>받은 메세지</Header2>
            <div className={cx('map')}>
            {messages.map((el,index)=> 
                <Link to={`/myPage/receiveMessageBox/${index}`}>
                <MessageList3 handleDeleteReceivedMessage={()=>handleDeleteReceivedMessage(el.messageId)} key={el.id} messages={el}/>
                </Link>)}
            </div>
            <Pagenation
                pageInfo = {pageInfo}
                currentPage = {currentPage}
                onPageChange = {handlePageChange}                
            />
            <Nav />
        </main>
    )
}

export default ReceivedMessages;