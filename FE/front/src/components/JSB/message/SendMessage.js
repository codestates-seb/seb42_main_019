import style from './MessageList3.module.css'
import classNames from 'classnames/bind';
import xIcon from '../../../assets/xIcon.png';

function SendMessage ({item, handleDeleteSendMessage}){
    const cx = classNames.bind(style);

    return(
        <>
            <div className={cx('all')} >
            <p className={cx('date')}>{item.date}</p>
            <div className={cx('box1')}>
                <p className={cx('name')}>{item.receiver.name}</p>
                <p className={cx('content')}>{item.content}</p>
            </div>
            <button onClick={(e)=>{handleDeleteSendMessage(); e.preventDefault();
            }} className={style.xIconbox}>
            <img className={style.xicon} src={xIcon} alt='xicon' />
            </button>
            </div>
        </>
    )
}

export default SendMessage;