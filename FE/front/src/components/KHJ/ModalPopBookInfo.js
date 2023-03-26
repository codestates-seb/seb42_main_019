import classNames from "classnames/bind";
import styles from './ModalPopUp.module.css'
import { ReactComponent as ModalXBtn } from '../../assets/ModalXBtn.svg'

function ModalPopUp({ bookData, open, onevent }) {
    const cx = classNames.bind(styles)
    function modalToggle(){
        return onevent(!open)
    }
    return (
        <>
            <article className={open ? cx('modal', 'open') : cx('modal')}>
                <header className={cx('header')}>
                    <h1 className={cx('h1')}>책 소개</h1>
                    <button className={cx('close')} onClick={modalToggle}><ModalXBtn /></button>
                </header>
                <h2 className={cx('gray_font', 'info_h2')}>책 소개</h2>
                <p>
                    {bookData.content}
                </p>
                {/* <h2 className={cx('gray_font', 'info_h2')}>목차</h2>
                <p className={cx('gray_font', 'no_data')}>제공된 데이터가 없습니다.</p> */}

            </article>
            <div className={open ? cx('modalback', 'on') : cx('modalback')} onClick={modalToggle}></div>
        </>
    );
}

export default ModalPopUp;