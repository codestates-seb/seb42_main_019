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
                    <h1 className={cx('h1')}>한줄평 보기</h1>
                    <button className={cx('close')} onClick={modalToggle}><ModalXBtn /></button>
                </header>
                <MessageList1 />
                <p className={cx('gray_font')}>나에게 남긴 한줄평</p>
                <div className={cx('input')}>좋은 거래였습니다.</div>
            </article>
            <div className={open ? cx('modalback', 'on') : cx('modalback')} onClick={modalToggle}></div>
        </>
    );
}

export default ModalPopUp;