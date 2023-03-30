import classNames from "classnames/bind";
import style from './MapAlert.module.css';
    
    function MapAlertMini({ message, handleClick }) {
        const cx = classNames.bind(style);

        const date = new Date();
        const dateText = new Date(message.sender.createdAt);
        
        function getDate() {
          const betweenTime = Math.round(Math.round(date.getTime() - dateText.getTime())/1000/60);
          if (betweenTime < 1) return '방금전';
          if (betweenTime < 60) {
            return `${betweenTime}분전`;
          }
          const betweenTimeHour = Math.round(betweenTime / 60);
          if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
          }
          const betweenTimeDay = Math.round(betweenTime / 60 / 24);
          if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
          }
          const betweenTimeMonth = Math.round(betweenTime / 60 / 24/ 30);
          if (betweenTimeMonth < 12) {
            return `${betweenTimeMonth}개월 전`;
          }
          return `${Math.round(betweenTimeDay / 365)}년전`;
        }
    
        return (
        <li
            onClick={()=>{handleClick(message.messageId)}}
            className={cx('all')}
            key={message}
        >
            <img
            className={cx('img')}
            src={`https://api.dicebear.com/5.x/bottts-neutral/svg`}
            alt={message.sender.name}
            />
            <div className={cx('notiBox')}>
            <p className={cx('noti1')}>⚡️ 메세지 알림</p>
            <p className={cx('noti2')}>
                {message.sender.name}님에게 메세지가 도착했습니다.
            </p>
            </div>
            <p className={cx('date')}>{getDate()}</p>
        </li>
        );
    }
    
    export default MapAlertMini;
    