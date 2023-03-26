import classNames from "classnames/bind";
import { useState } from "react";
import style from './MapAlert.module.css'

function MapAlertMini({message, handleClick}){
    const cx = classNames.bind(style)


const getRandomNumber = (min, max) => {
    return parseInt(Math.random()*(Number(max)-Number(min) + 2));
}

//'isOn'상태, 클래스 지정했던 이유 : 클릭 시 회색표시로 바꾸기 위해서.
//주석처리한 이유 : 클릭 시 해당 리스트 삭제하고 메세지박스로 이동시키는 걸로 바꿨음.

const [isOn, setIsOn] = useState(false);

// const handleToggle = () => {
//     setIsOn(!isOn); 
// };



return (
        <li onClick={()=>{handleClick(message.id)}} className={cx('all', { 'clicked': isOn })}  key={message.id}>
            <img className={cx('img')} src={`https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`} alt={message.name} />
            <div className={cx('notiBox', { 'clicked': isOn })}>
                <p className={cx('noti1', { 'clicked': isOn })}>⚡️ 메세지 알림</p>
                <p className={cx('noti2', { 'clicked': isOn })}>{message.name}님에게 메세지가 도착했습니다.</p>
            </div>
            <p className={cx('date', { 'clicked': isOn })}>{message.date}</p>
        </li>
    )
    
    }
    
    export default MapAlertMini;