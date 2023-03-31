import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/api'

import style from './ReceivedMessages.module.css'
import classNames from 'classnames';

import Nav from '../../components/common/Nav';
import Header2 from '../../components/common/Header2';
import MessageList3 from '../../components/JSB/message/MessageList3';


const ReceivedMessages = () => {
    const cx = classNames.bind(style)
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        const fetchReceived = async () =>{
            try {
                const response = await axios.get(`/messages/received/?pageNumber=1&size=7&sort=create_date_time,DESC`);
                const data = response.data.data
                setMessages(data);
            }catch(error){
                console.error('error is Here', error);
            }
        }
        fetchReceived();
    }, []);

 
    return(
        <>
        <Header2>메세지</Header2>
        
            <div className={cx('map')}>
            {messages.map((el)=> 
                <Link to={`/myPage/receiveMessageBox/${el.messageId}`}>
                <MessageList3 key={el.id} messages={el}/>
                </Link>)}
            </div>
        
        <Nav />
        </>
    )
}

export default ReceivedMessages;