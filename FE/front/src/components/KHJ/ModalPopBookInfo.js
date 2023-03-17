import classNames from "classnames/bind";
import styles from './ModalPopUp.module.css'
import { ReactComponent as ModalXBtn } from '../../assets/ModalXBtn.svg'

function ModalPopUp({ open, onevent }) {
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
                    어느 날, 두더지는 기분 좋게 땅 위로 올라왔다가 그만 똥세례를 받는다. 화가 난 두더지는 누가 자기 머리 위에 똥을 쌌는지 알아내려고 길을 나선다. 하지만, 만나는 동물마다 자신의 똥을 직접 보여주면서, 자신이 범인이 아니라고 한다. 그러는 과정에서 두더지는 정육점집 개 한스가 자신의 머리 위에 똥을 쌌다는 것을 알게 된다.
                </p>
                <h2 className={cx('gray_font', 'info_h2')}>목차</h2>
                <p className={cx('gray_font', 'no_data')}>제공된 데이터가 없습니다.</p>

            </article>
            <div className={open ? cx('modalback', 'on') : cx('modalback')} onClick={modalToggle}></div>
        </>
    );
}

export default ModalPopUp;