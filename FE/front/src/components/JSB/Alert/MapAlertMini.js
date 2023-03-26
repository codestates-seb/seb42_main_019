// import classNames from "classnames/bind";
// import style from './MapAlert.module.css'
// import { useEffect } from "react";
// import axios from "axios";

// function MapAlertMini({message, handleClick, setNoti, noti}){
//     const cx = classNames.bind(style)

//     useEffect(() => {
//         // Fetch notifications from API every minute
//         const intervalId = setInterval(() => {
//           axios.get('http://localhost:8080/messages/received/1?pageNumber=1&size=10&sort=create_date_time,DESC')
//             .then(response => {
//               const data = response.data;
//               if (data.note) {
//                 // Add new notification to existing list of notifications
//                 setNoti(prevNoti => [...prevNoti, {id: prevNoti.length+1, message: data.note}]);
//                 // Show notification using the Notification API
//                 showNotification(data.note);
//               }
//             })
//             .catch(error => {
//               console.error(error);
//             });
//         }, 60000);
      
//         // Cleanup function to clear interval when component unmounts
//         return () => clearInterval(intervalId);
//       }, []);
      
//       function showNotification(message) {
//         if (Notification.permission === "granted") {
//           new Notification(message);
//         } else if (Notification.permission !== "denied") {
//           Notification.requestPermission().then(permission => {
//             if (permission === "granted") {
//               new Notification(message);
//             }
//           });
//         }
//       }
      

// return (
//         <li onClick={()=>{handleClick(message.id)}} className={cx('all')}  key={message.id}>
//             <img className={cx('img')} src={`https://api.dicebear.com/5.x/bottts-neutral/svg`} alt={"basicAvatar"} />
//             <div className={cx('notiBox')}>
//                 <p className={cx('noti1')}>⚡️ 메세지 알림</p>
//                 <p className={cx('noti2')}>{message.name}님에게 메세지가 도착했습니다.</p>
//             </div>
//             <p className={cx('date')}>{message.date}</p>
//         </li>
//     )
    
//     }
    
//     export default MapAlertMini;


//     //





import classNames from "classnames/bind";
import style from './MapAlert.module.css'
import { useState, useEffect } from "react";
import axios from "axios";

function MapAlertMini({handleClick}){
    const cx = classNames.bind(style)
    const [messageData, setMessageData] = useState([]);

    useEffect(() => {
    const intervalId = setInterval(() => {
        axios
        .get('http://ec2-3-35-22-107.ap-northeast-2.compute.amazonaws.com:8080/messages/received/1?pageNumber=1&size=10&sort=create_date_time,DESC')
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

export default MapAlertMini ;
