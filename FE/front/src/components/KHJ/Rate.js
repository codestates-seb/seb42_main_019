import styles from './Rate.module.css';
import classNames from 'classnames/bind';
import {FiThumbsDown} from 'react-icons/fi';
import {FiThumbsUp} from 'react-icons/fi';
import { useState } from 'react';
import {ReactComponent as EditBtn} from '../../assets/EditBtn.svg'
import {ReactComponent as XBtn} from '../../assets/XBtn.svg'

function Rate({ ratedata }) {
    const cx = classNames.bind(styles);
    const parsedDate = new Date(ratedata.createdAt).toLocaleDateString('ko-KR');
    
    const [isOpen, setIsOpen] = useState(true);
    function isWidth(width, key) {
        if(width[key].length > 30){
            return true
        }
        return false
    }
    function isEdit(user){
        if(ratedata.createdAt){
            return false;
        }
        return false;
    }
    function isGoodBad(rate){
        if(ratedata.rate === 'good') return (<><FiThumbsUp size="20" color="#2f5a2d"/></>);
        if(ratedata.rate === 'bad') return (<><FiThumbsDown size="20" color="#999999"/></>);
        return '';
    }
    function isopenHandler(){
        return setIsOpen(!isOpen)
    }

    const [isEditShow, setIsEditShow] = useState(true);

    return (
        <li className={isOpen ? cx('rate', 'open') : cx('rate')} key={ratedata.id}>
            <p className={cx('top')}>
                <strong>
                    {ratedata.name}
                    <span className={cx('goodbad')}>{isGoodBad(ratedata.rate)}</span>
                </strong>
                {isEdit() ?
                (
                <div>
                    <button><EditBtn /></button>
                    <button><XBtn /></button>
                </div>
                )
                :
                <span>{parsedDate}</span>
                }
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