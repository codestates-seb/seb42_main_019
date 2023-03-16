import classNames from "classnames/bind";
import styles from './ModalPopUp.module.css'

function ModalPopUp({ open, onevent }) {
    const cx = classNames.bind(styles)
    function modalToggle(){
        return onevent(!open)
    }
    return (
        <>
            <div className={open ? cx('modal') : cx('modal', 'open')}>
                <button classNames={cx('close')} onClick={modalToggle}>X</button>
            </div>
            <div className={open ? cx('modalback') : cx('modalback', 'on')} onClick={modalToggle}></div>
        </>
    );
}

export default ModalPopUp;