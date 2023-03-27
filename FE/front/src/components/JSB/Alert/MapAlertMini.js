import classNames from "classnames/bind";
import style from './MapAlert.module.css'

function MapAlertMini({message, handleClick}){
    const cx = classNames.bind(style)

return (
        <li onClick={()=>{handleClick(message.id)}} className={cx('all')}  key={message.id}>
            <img className={cx('img')} src={`https://api.dicebear.com/5.x/bottts-neutral/svg`} alt={message.messageId.sender.name} />
            <div className={cx('notiBox')}>
                <p className={cx('noti1')}>⚡️ 메세지 알림</p>
                <p className={cx('noti2')}>{message.messageId.sender.name}님에게 메세지가 도착했습니다.</p>
            </div>
            <p className={cx('date')}>{message.messageId.sender.createdAt}</p>
        </li>
    )
    
    }
    
    export default MapAlertMini;