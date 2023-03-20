import classNames from "classnames/bind";
import messageContent1 from '../../dummyData/SB/messageContent1';
import style from './Alert.module.css';
import MapAlertMini from "../../components/JSB/Alert/MapAlertMini";
import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Alert(){
    const cx=classNames.bind(style);
    const history = useNavigate();
    const [noti, setNoti] = useState(messageContent1);

    useEffect(()=>{
        const savedNoties = localStorage.getItem('noti');
        if(savedNoties){
            setNoti(JSON.parse(savedNoties));
        }
    }, []);

    const handleClick = (id) =>{
        const updatedList = noti.filter(noti => noti.id !== id)
        setNoti(updatedList);
        localStorage.setItem('noti', JSON.stringify(updatedList));
        console.log(noti)
        history('/myPage/messageBox')
    }


    return(
        <>
            <Header2>메세지 알림</Header2>
            <ul className={cx('map')} >
            {noti.map((el) => <MapAlertMini handleClick={handleClick}  key = {el.id} message={el}/>)}
            </ul>
            <Nav />
        </>
    )
}

export default Alert;