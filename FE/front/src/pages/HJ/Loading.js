import classNames from 'classnames/bind';
import Header2 from '../../components/common/Header2';
import styles from './HJpage.module.css'

function Loading() {
    const cx = classNames.bind(styles)

    return (
        <div className={cx('wrap')}>
            <Header2 />
                <div className={cx('error', 'loading_page')}>
                    <div className={cx("loading")}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <h1>로딩중...</h1>
                </div>
        </div>
    );
}

export default Loading;