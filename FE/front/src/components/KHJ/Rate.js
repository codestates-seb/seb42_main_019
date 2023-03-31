import styles from './Rate.module.css';
import classNames from 'classnames/bind';
import { useState } from 'react';
import {ReactComponent as EditBtn} from '../../assets/EditBtn.svg'
import {ReactComponent as XBtn} from '../../assets/XBtn.svg'
import api from '../../api/api';

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

    // 내가 남긴 후기 수정, 삭제 용
    const userIdNum = localStorage.getItem('userId')
    const user = localStorage.getItem('userName')
    const isUser = () => user === ratedata.senderName;

    const delRate = async() => {
        const url = `/user/${userIdNum}/comment/${ratedata.commentId}`;
        try{
            await api({
                method:'del',
                url
            });
            await getRate();
        } catch (err) {
            console.log(err);
        };
    };
    const delRatehandler = () => {
        const result = window.confirm("삭제하시겠습니까?");
        if(result) {
            delRate()
        }
    }

    function isopenHandler(){
        return setIsOpen(!isOpen)
    }

    return (
        <li className={cx('rate', {open : isOpen})} key={ratedata.id}>
            <p className={cx('top')}>
                <strong>
                    {ratedata.recipientName}
                </strong>
                {isUser() ?
                (
                <div className={cx('edit')}>
                    <button><EditBtn /></button>
                    <button onClick={delRatehandler}><XBtn /></button>
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