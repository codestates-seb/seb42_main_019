import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/api";

import style from './Alert.module.css';
import classNames from "classnames/bind";

import MapAlertMini from "../../components/JSB/Alert/MapAlertMini";
import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav';

//1. 메세지가 시간 순서대로 정렬된다 (오름차순)( )
//2. 메세지 리스트 하나를클릭하면 해당 리스트가 삭제되며 해당 메세지로 이동된다 ( )
//3. 'Delete All Message!' 버튼을 누르면 모든 메세지리스트가 삭제된다 ( )
//4. 1분마다 메세지 get 요청을 보낸다 ( )

function Alert(){
    const cx=classNames.bind(style);
    const history = useNavigate();
    const [messageData, setMessageData] = useState([]);


    useEffect(()=>{
        const savedMessageData = localStorage.getItem('messageData');
        if(savedMessageData){
            setMessageData(JSON.parse(savedMessageData));
        }
        
        const fetchData = async () => {
            try {
            const response = await axios.get(`/messages/received/?pageNumber=1&size=10&sort=create_date_time,DESC`);
            console.log(response.data)
            setMessageData(response.data);
            } catch (error) {
            console.error(error);
            }
        };
        
        const intervalId = setInterval(fetchData, 60000);
        
        return () => {
            clearInterval(intervalId);
        };
        }, []);
        


    const handleClick = async (id) => {
        try {
        await axios.delete(`/messages/${id}`);
        const updatedList = messageData.filter(message => message.id !== id);
        setMessageData(updatedList);
        localStorage.setItem('messageData', JSON.stringify(updatedList));
        history('/myPage/messageBox');
        } catch (error) {
        console.error(error);
        }
    }
    


    return(
        <>
            <Header2>메세지 알림</Header2>
            <ul className={cx('map')} >
            {messageData.map((message) => <MapAlertMini handleClick={handleClick}  key = {message.id} message={message}/>)}
            </ul>
            <Nav />
        </>
    )
}

export default Alert;