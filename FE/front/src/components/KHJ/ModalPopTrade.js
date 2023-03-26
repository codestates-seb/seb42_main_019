import classNames from "classnames/bind";
import styles from './ModalPopUp.module.css'
import { ReactComponent as ModalXBtn } from '../../assets/ModalXBtn.svg'
import { useState } from "react";
import DropdownOpt from "./DropdownOpt";
import tradeShelfdata from '../../dummyData/tradeShelfdata'
import { ReactComponent as Dropdownarrow } from '../../assets/dropdownarrow.svg'

function ModalPopUp({ open, onevent }) {
    const cx = classNames.bind(styles)
    function modalToggle(){
        return onevent(!open)
    }
    const [isDrop, setDrop] = useState(true);
    function dropdownToggle(){
        return setDrop(!isDrop);
    }
    const [isBook, setBook] = useState('');
    function BookName(e) {
        return setBook(isBook)
    }

    return (
        <>
            <article className={open ? cx('modal', 'open') : cx('modal')}>
                <header className={cx('header')}>
                    <h1 className={cx('h1')}>교환요청</h1>
                    <button className={cx('close')} onClick={modalToggle}><ModalXBtn /></button>
                </header>
                <h2 className={cx('gray_font', 'h2')}>교환할 책 선택</h2>
                <div className={isDrop? cx('dropdown', 'on') : cx('dropdown')}>
                    <button
                        onClick={dropdownToggle}
                        className={cx('select')}
                    >
                        유저의 책장
                        <span className={cx('arrow')}><Dropdownarrow /></span>
                    </button>
                    <ul className={cx('option')} onClick={dropdownToggle}>
                        {tradeShelfdata.map((el) => <DropdownOpt onClick={BookName} book={el} />)}
                    </ul>
                </div>
                <div className={cx('btn_wrap')}>
                    <button className={cx('modalBtn')}>거절하기</button>
                    <button className={cx('modalBtn', 'green')}>수락하기</button>
                </div>
            </article>
            <div className={open ? cx('modalback', 'on') : cx('modalback')} onClick={modalToggle}></div>
        </>
    );
}

export default ModalPopUp;