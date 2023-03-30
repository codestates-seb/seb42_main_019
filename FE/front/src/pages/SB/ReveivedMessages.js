/* eslint-disable no-undef */
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../api/api';

import style from './ReceivedMessages.module.css'
import classNames from 'classnames';

import Nav from '../../components/common/Nav';
import Header2 from '../../components/common/Header2';
import MessageList3 from '../../components/JSB/message/MessageList3';


const ReceivedMessages = () => {
    const cx = classNames.bind(style)
    const [received, setReceived] = useState([])
    const navigate = useNavigate();


    useEffect(() => {
        const ReceivedMessage = async () => {
            try {
            const response = await axios.get(`/messages/received/?pageNumber=1&size=10&sort=create_date_time,DESC`);
            const received = response.data.data;
            setReceived(received);
            console.log('Messages received successfully', received);
            console.log(response)
            } catch (error) {
            console.error('Error getting messages', error);
            }
        };
    
        ReceivedMessage()
        }, []);

        
        const handleClick = function(){
            navigate('/myPage/messageBox')
        }
        const receiver = function(){
            if(messages.length === 0){
                return true
            }else {
                return false
            }
        }


if(received.length === 0){
    return <div></div>
}else {
    return(
        <>
        <Header2>받은 메세지</Header2>
        
            <div onClick={()=>{handleClick()}}  className={cx('map')}>
            {receiver()? <p>No Data</p>
            :
            received.map((el)=> 
                <Link to={`/myPage/messageBox/${el.id-1}`}>
                <MessageList3 key={el.id} el={el}/>
                </Link>)
            }
            </div>
        <Nav />
        </>
    )
    }
}

export default ReceivedMessages;