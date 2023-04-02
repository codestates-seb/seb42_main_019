import styles from './Rate.module.css';
import classNames from 'classnames/bind';
import { useState } from 'react';

function Rate({ ratedata, getRate }) {
    const cx = classNames.bind(styles);
    const parsedDate = new Date(ratedata.createdAt).toLocaleDateString('ko-KR');
    
    const [isOpen, setIsOpen] = useState(true);
    function isWidth(width, key) {
        if(width[key].length > 30){
            return true
        }
        return false
    }

    function isopenHandler(){
        return setIsOpen(!isOpen);
    }
    

    return (
        <li className={cx('rate', {open : isOpen})} key={ratedata.id}>
            <p className={cx('top')}>
                <strong>
                    {ratedata.senderName}
                </strong>
            <span>{parsedDate}</span>
            </p>
            <p>{ratedata.content}</p>
            {isWidth(ratedata, 'content') ?
                <button onClick={isopenHandler} className={cx('plus')}>
                    {isOpen ? '더보기 +' : '닫기'}
                </button>
                :
                null
            }
        </li>
    );
}

export default Rate;