// import classNames from "classnames/bind";
// import messageContent1 from '../../dummyData/SB/messageContent1';
// import style from './Alert.module.css';
// import MapAlertMini from "../../components/JSB/Alert/MapAlertMini";
// import Header2 from "../../components/common/Header2";
// import Nav from '../../components/common/Nav';
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

//1. 3가지 알람이 옴 (메세지 도착, 교환 요청, 교환 수락)
//  ㄴ 메세지 도착 구현 ( )
//  ㄴ 교환 요청 구현 ( )
//  ㄴ 교환 수락 구현 ( )
//2. 개별 알림 삭제 (클릭하면 1. 모달창, 2. 메세지보내기 페이지, 3. 메세지함) 
//3. 전체 알림 삭제 (버튼) (0)

// function Alert(){
//     const cx=classNames.bind(style);
//     const history = useNavigate();
//     const [noti, setNoti] = useState(messageContent1);

//     useEffect(()=>{
//         const savedNoties = localStorage.getItem('noti');
//         if(savedNoties){
//             setNoti(JSON.parse(savedNoties));
//         }
//     }, []);

//     const handleClick = (id) =>{
//         const updatedList = noti.filter(noti => noti.id !== id)
//         setNoti(updatedList);
//         localStorage.setItem('noti', JSON.stringify(updatedList));
//         console.log(noti)
//         history('/myPage/messageBox')
//     }

//     const handleClick2 = (id)=>{
//         const updatedList = []
//         setNoti(updatedList);
//         localStorage.setItem('noti',JSON.stringify(updatedList));
//         history('/alert');
//     }


//     return(
//         <>
//             <Header2>메세지 알림</Header2>
//             <div onClick={()=>{handleClick2(noti.id)}} className={style.box1}>
//                 <div className={style.notFooter}>
//                     <div className={style.listboxMessage}> Delete All Message! </div>
//                 </div>
//             </div>  
//             <ul className={cx('map')} >
//             {noti.map((el) => <MapAlertMini handleClick={handleClick}  key = {el.id} message={el}/>)}
//             </ul>
//             <Nav />
//         </>
//     )
// }

// export default Alert;






import classNames from "classnames/bind";
import messageContent1 from '../../dummyData/SB/messageContent1';
import style from './Alert.module.css';
import MapAlertMini from "../../components/JSB/Alert/MapAlertMini";
import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// 1. 3가지 알람이 옴 (메세지 도착, 교환 요청, 교환 수락)
//  ㄴ 메세지 도착 구현 (0 )
// 2. 개별 알림 삭제 (0)
//  ㄴ 클릭하면 해당 메세지함으로 이동 
// 3. 전체 알림 삭제 (버튼) (0)
//  ㄴ 클릭하면 전체 메세지 삭제

function Alert(){
    const cx=classNames.bind(style);
    const history = useNavigate();
    const [noti, setNoti] = useState(messageContent1);
    const [messageData, setMessageData] = useState([]);


    useEffect(()=>{
        const savedNoties = localStorage.getItem('noti');
        if(savedNoties){
            setNoti(JSON.parse(savedNoties));
        }
        
        const fetchData = async () => {
            try {
            const response = await axios.get('http://localhost:8080/messages/received/1?pageNumber=1&size=10&sort=create_date_time,DESC');
            setMessageData(response.data);
            setNoti(response.data);
            } catch (error) {
            console.error(error);
            }
        };
        
        const intervalId = setInterval(fetchData, 60000);
        
        return () => {
            clearInterval(intervalId);
        };
        }, []);
        


    const handleClick = (id) =>{
        const updatedList = messageData.filter(messageData => messageData.id !== id)
        setMessageData(updatedList);
        localStorage.setItem('messageData', JSON.stringify(updatedList));
        console.log(messageData)
        history('/myPage/messageBox')
    }

    const handleClick2 = (id)=>{
        const updatedList = []
        setMessageData(updatedList);
        localStorage.setItem('messageData',JSON.stringify(updatedList));
        history('/alert');
    }


    return(
        <>
            <Header2>메세지 알림</Header2>
            <div onClick={()=>{handleClick2(noti.id)}} className={style.box1}>
                <div className={style.notFooter}>
                    <div className={style.listboxMessage}> Delete All Message! </div>
                </div>
            </div>  
            <ul className={cx('map')} >
            {noti.map((el) => <MapAlertMini handleClick={handleClick}  key={el.id} message={el} setNoti={setNoti} noti={noti}/>)}
            </ul>
            <Nav />
        </>
    )
}

export default Alert;

