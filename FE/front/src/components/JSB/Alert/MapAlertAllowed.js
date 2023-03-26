// import classNames from "classnames/bind";
// import style from './MapAlert.module.css'

// function MapAlertAllowed({message, handleClick3}){
//     const cx = classNames.bind(style)

// return (
//         <li onClick={()=>{handleClick3(message.id)}} className={cx('all')}  key={message.id}>
//             <img className={cx('img')} src={`https://api.dicebear.com/5.x/bottts-neutral/svg`} alt={"basicAvatar"} />
//             <div className={cx('notiBox')}>
//                 <p className={cx('noti1')}>⚡️ 교환 수락 알림</p>
//                 <p className={cx('noti2')}>{message.name}님이 교환요청을 수락했습니다!</p>
//             </div>
//             <p className={cx('date')}>{message.date}</p>
//         </li>
//     )
    
//     }
    
//     export default MapAlertAllowed;



import classNames from "classnames/bind";
import style from './MapAlert.module.css'
import { useState, useEffect } from "react";
import axios from "axios";

function MapAlertMini({ handleClick }) {
  const cx = classNames.bind(style);
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
    <ul>
      {messageData.map(message => (
        <li onClick={() => { handleClick(message.id) }} className={cx('all')} key={message.id}>
          <img className={cx('img')} src={`https://api.dicebear.com/5.x/bottts-neutral/svg`} alt={"basicAvatar"} />
          <div className={cx('notiBox')}>
            <p className={cx('noti1')}>⚡️ 메세지 알림</p>
            <p className={cx('noti2')}>{message.senderName}님에게 메세지가 도착했습니다.</p>
          </div>
          <p className={cx('date')}>{message.time}</p>
        </li>
      ))}
    </ul>
  );
}

export default MapAlertMini;
