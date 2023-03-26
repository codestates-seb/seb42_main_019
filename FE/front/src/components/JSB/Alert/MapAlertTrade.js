// import classNames from "classnames/bind";
// import style from './MapAlert.module.css'

// function MapAlertTrade({message, handleClick}){
//     const cx = classNames.bind(style)

// return (
//         <li onClick={()=>{handleClick(message.id)}} className={cx('all')}  key={message.id}>
//             <img className={cx('img')} src={`https://api.dicebear.com/5.x/bottts-neutral/svg`} alt={"basicAvatar"} />
//             <div className={cx('notiBox')}>
//                 <p className={cx('noti1')}>⚡️교환 요청 알림</p>
//                 <p className={cx('noti2')}>{message.name}님이 책 교환을 요청했습니다!</p>
//             </div>
//             <p className={cx('date')}>{message.date}</p>
//         </li>
//     )
    
//     }
    
//     export default MapAlertTrade;




import classNames from "classnames/bind";
import style from './MapAlert.module.css'
import { useState, useEffect } from "react";
import axios from "axios";

function MapAlertMini({message, handleClick, setNoti, noti}){
    const cx = classNames.bind(style)
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get('http://localhost:8080/messages/received/1?pageNumber=1&size=10&sort=create_date_time,DESC')
        .then(response => {
          setMessageData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {messageData.map(message => (
        <div key={message.time}>
          <h2>{message.title}</h2>
          <p>{message.content}</p>
          <p>From: {message.senderName}</p>
          <p>To: {message.receiverName}</p>
          <p>Sent at: {message.time}</p>
        </div>
      ))}
    </div>
  );
}