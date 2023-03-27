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
                    {bookData.contents}
                </p>
                <h2 className={cx('gray_font', 'info_h2')}>링크</h2>
                <a href={bookData.url} target='_blank' className={cx('gray_font', 'no_data')} rel="noreferrer">{bookData.url}</a>

            </article>
            <div className={open ? cx('modalback', 'on') : cx('modalback')} onClick={modalToggle}></div>
        </>
    );
}

export default ModalPopUp;