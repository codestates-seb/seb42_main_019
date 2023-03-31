import style from './MessageList3.module.css'
import classNames from 'classnames/bind';

function SendMessage ({item}){
    const cx = classNames.bind(style);
    console.log(item)
    return(
        <>
            <div className={cx('all')} >
            <p className={cx('date')}>{item.date}</p>
            <div className={cx('box1')}>
                <p className={cx('name')}>{item.receiver.name}</p>
                <p className={cx('content')}>{item.content}</p>
            </div>
            </div>
        </>
    )
}

export default SendMessage;