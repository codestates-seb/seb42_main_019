import classNames from "classnames/bind";
import styles from './ModalPopUp.module.css'
import { ReactComponent as ModalXBtn } from '../../assets/ModalXBtn.svg'
import { useState } from "react";
import api from "../../api/api";
import { useParams } from "react-router-dom";

function ModalPopUp({ open, onevent, getRate }) {
    const cx = classNames.bind(styles);
    const [isContent, setContent] = useState('');

    function modalToggle(){
        return onevent(!open);
    }

    const params = useParams();
    const userId = params.userid;

    const addComment = async() => {
        const url = `user/${userId}/comment`;
        const content = {
            content : `${isContent}`
        };
        try{
            await api({
                method:'post',
                url,
                data: content
            });
            setContent('');
            await getRate();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <article className={open ? cx('modal', 'open') : cx('modal')}>
                <header className={cx('header')}>
                    <h1 className={cx('h1')}>후기 작성하기</h1>
                    <button className={cx('close')} onClick={modalToggle}><ModalXBtn /></button>
                </header>
                <p className={cx('gray_font', 'exp')}>상대 유저에게 하고 싶은 말을 작성해주세요</p>
                <input
                    className={cx('input')}
                    placeholder='유저에게 후기를 남겨주세요.'
                    onChange={(e) => setContent(e.target.value)}
                    value={isContent}
                ></input>
                <div className={cx('btn_wrap')}>
                    <button className={cx('modalBtn')}>취소하기</button>
                    <button
                        className={cx('modalBtn', 'green')}
                        onClick={() => {
                            modalToggle();
                            addComment();
                        }}
                    >작성하기</button>
                </div>
            </article>
            <div className={open ? cx('modalback', 'on') : cx('modalback')} onClick={modalToggle}></div>
        </>
    );
}

export default ModalPopUp;