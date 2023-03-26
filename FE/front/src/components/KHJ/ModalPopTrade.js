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
        setDrop(false);
        onevent(!open)
        setBook('상대방의 책장');
    }
    const [isDrop, setDrop] = useState(false);
    function dropdownToggle(){
        return setDrop(!isDrop);
    }
    const [isBook, setBook] = useState('상대방의 책장');
    function bookChange(book) {
        return setBook(book);
    }

    const isBookNameOn = () => {
        if(isBook === '상대방의 책장'){
            return false;
        }else{
            return true;
        }
    }
    const isBookNameNone = () => {
        if(isBook === '상대방의 책장'){
            alert('책을 선택해주세요');
        }
    }

    return (
        <>
            <article className={open ? cx('modal', 'open') : cx('modal')}>
                <header className={cx('header')}>
                    <h1 className={cx('h1')}>교환요청</h1>
                    <button className={cx('close')} onClick={modalToggle}><ModalXBtn /></button>
                </header>
                <h2 className={cx('gray_font', 'h2')}>교환할 책 선택</h2>
                <div className={cx('dropdown', {on : isDrop})}>
                    <button
                        onClick={dropdownToggle}
                        className={cx('select', {opton : isBookNameOn()})}
                    >
                        {isBook}
                        <span className={cx('arrow')}><Dropdownarrow /></span>
                    </button>
                    <ul className={cx('option')} onClick={dropdownToggle}>
                        {tradeShelfdata.map((el) => <DropdownOpt bookChange={bookChange} book={el} />)}
                    </ul>
                </div>
                <div className={cx('btn_wrap')}>
                    <button className={cx('modalBtn')}>거절하기</button>
                    <button className={cx('modalBtn', 'green')} onClick={() => isBookNameNone()}>수락하기</button>
                </div>
            </article>
            <div className={cx('modalback', {on : open})} onClick={modalToggle}></div>
        </>
    );
}

export default ModalPopUp;