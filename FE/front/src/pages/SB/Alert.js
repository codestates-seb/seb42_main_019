import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/api";

import style from './Alert.module.css';
import classNames from "classnames/bind";

import MapAlertMini from "../../components/JSB/Alert/MapAlertMini";
import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav';

//1. 메세지가 시간 순서대로 정렬된다 (오름차순)( )
//2. 메세지 리스트 하나를클릭하면 해당 리스트가 삭제되며 해당 메세지로 이동된다 ( )
//3. 1분마다 메세지 get 요청을 보낸다 ( )

function Alert(){
    const cx=classNames.bind(style);
    const history = useNavigate();
    const [messageData, setMessageData] = useState([]);
    

    useEffect(()=>{
        
        const fetchData = async () => {
            try {
            const response = await axios.get(`/messages/received/?pageNumber=1&size=7&sort=create_date_time,DESC`);
            setMessageData(response.data.data);
            } catch (error) {
            console.error(error);
            }
        };
        fetchData()
        
        console.log("messageData",messageData)
        const intervalId = setInterval(fetchData, 60000);
        
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    

    const handleClick = async (id) => {
        try {
        const res = await axios.put(`/messages/messages/${id}`)
        console.log(res);
        } catch (error) {
        console.error(error);
        }
    }
    console.log(messageData)

    return(
        <>
            <Header2>메세지 알림</Header2>
            <ul className={cx('map')} >
            {messageData.length===0 ? <p style={{textAlign:"center", lineHeight:"300px"}}>당신의 메세지는 0개!</p> 
            :
            messageData.map((message,index) => 
            <Link to={`/myPage/receiveMessageBox/${index}`} onClick={() => handleClick(message.messageId)} key={message.messageId}>
                {!message.readAt && <MapAlertMini message={message}/>}
            </Link>
            )
            }
            </ul>
            <Nav />
        </>
    )
}



export default Alert;