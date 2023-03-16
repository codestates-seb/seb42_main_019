import classNames from "classnames/bind";
import styles from './ModalPopUp.module.css'

function ModalPopUp({ open, onevent }) {
    const cx = classNames.bind(styles)
    function modalToggle(){
        return onevent(!open)
    }
    return (
        <>
            <div className={open ? cx('modal', 'open') : cx('modal')}>
                <button classNames={cx('close')} onClick={modalToggle}>X</button>
            </div>
            <div className={open ? cx('modalback', 'on') : cx('modalback')} onClick={modalToggle}></div>
        </>
    );
}

export default ModalPopUp;