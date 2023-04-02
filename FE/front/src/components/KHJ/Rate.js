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
    const userIdNum = Number(localStorage.getItem('userId'));
    const user = localStorage.getItem('userName');
    const isUser = () => user === ratedata.senderName;
    
    const [editable, setEditable] = useState(false);
    const [isContent, setContent] = useState('');

    const patchRate = async() => {
        const url = `/user/comment/${ratedata.commentId}`;
        const content = {
            content : `${isContent}`
        }
        try{
            await api({
                method:'patch',
                url,
                data : content
            });
            editHandler()
            await getRate();
        } catch (err) {
            console.log(err);
        };
    };

    const delRate = async() => {
        const url = `/user/${userIdNum}/comment/${ratedata.commentId}`;
        try{
            await api({
                method:'delete',
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
            delRate();
        }
    }

    function isopenHandler(){
        return setIsOpen(!isOpen);
    }
    
    function editHandler () {
        setEditable(!editable);
    }

    return (
        <li className={cx('rate', {open : isOpen})} key={ratedata.id}>
            <div className={cx('top')}>
                <strong>
                    {ratedata.senderName}
                </strong>
                {isUser() ?
                (
                <div className={cx('edit')}>
                    {editable ?
                        <>
                            <button onClick={patchRate}><EditBtn /></button>
                            <button onClick={editHandler}><XBtn /></button>
                        </>
                        :
                        <>
                            <button onClick={editHandler}><EditBtn /></button>
                            <button onClick={delRatehandler}><XBtn /></button>
                        </>
                    }
                </div>
                )
                :
                <span>{parsedDate}</span>
                }
            </div>
            {editable ?
                <input
                    className={cx('input')}
                    type={'text'}
                    onChange={(e) => setContent(e.target.value)}
                    defaultValue={ratedata.content}
                    maxLength='40'
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && isContent !== '') {
                            if (e.nativeEvent.isComposing === false) {
                                patchRate();
                            }
                        }
                    }}
                ></input>
                :
                <p>{ratedata.content}</p>
            }
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