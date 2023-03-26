import classNames from "classnames/bind";
import styles from './ModalPopUp.module.css'
import { ReactComponent as ModalXBtn } from '../../assets/ModalXBtn.svg'
import MessageList1 from "../JSB/message/MessageList1";

function ModalPopUp({ open, onevent }) {
    const cx = classNames.bind(styles)
    function modalToggle(){
        return onevent(!open)
    }
    return (
        <>
            <article className={open ? cx('modal', 'open') : cx('modal')}>
                <header className={cx('header')}>
                    <h1 className={cx('h1')}>한줄평 작성하기</h1>
                    <button className={cx('close')} onClick={modalToggle}><ModalXBtn /></button>
                </header>
                <MessageList1 />
                <p className={cx('gray_font')}>상대 유저에게 하고 싶은 말을 작성해주세요</p>
                <input
                className={cx('input')}
                type={'text'}
                placeholder='한줄평 작성하기'
                onChange={(e) => {}}
                ></input>
                <div className={cx('btn_wrap')}>
                    <button className={cx('modalBtn')}>취소하기</button>
                    <button className={cx('modalBtn', 'green')}>작성하기</button>
                </div>
            </article>
            <div className={open ? cx('modalback', 'on') : cx('modalback')} onClick={modalToggle}></div>
        </>
    );
}

export default ModalPopUp;