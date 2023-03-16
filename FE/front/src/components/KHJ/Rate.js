import styles from './Rate.module.css';
import classNames from 'classnames/bind';
import {FiThumbsDown} from 'react-icons/fi';
import {FiThumbsUp} from 'react-icons/fi';
import { useState } from 'react';

function Rate({ ratedata }) {
    const [setIsOpen, isOpen] = useState(true);
    const cx = classNames.bind(styles);
    const parsedDate = new Date(ratedata.createdAt).toLocaleDateString('ko-KR');
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
    // console.log(ratedata.rate)
    console.log(isGoodBad(ratedata.rate))
    function ContentLength(text){
        return true;
        // text 길이에 따라 리턴값 주자 그냥...
    }
    function isopenHandler(){
        return setIsOpen(!isOpen)
    }
    return (
        <li className={cx('rate')} key={ratedata.id}>
            <p className={cx('top')}>
                <strong>
                    {ratedata.name}
                    <span className={cx('goodbad')}>{isGoodBad(ratedata.rate)}</span>
                </strong>
                {isEdit() ?
                (
                <div>
                    <button>edit</button>
                    <button>delete</button>
                </div>
                )
                :
                <span>{parsedDate}</span>
                }
            </p>
            <p>{ratedata.content}</p>
            {ContentLength(ratedata.content)?
            <button className={cx('plus')}>더보기 +</button>
            :
            null}
        </li>
    );
}

export default Rate;