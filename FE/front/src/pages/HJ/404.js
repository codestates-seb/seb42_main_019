import classNames from 'classnames/bind';
import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav';
import styles from './HJpage.module.css'
import { ReactComponent as ErrorImg } from '../../assets/404.svg'

function ErrorPage() {
    const cx = classNames.bind(styles)

    return (
        <div className={styles.wrap}>
            <Header2 />
                <div className={cx('error')}>
                    <ErrorImg />
                    <h1>저런! 페이지가 작동하지 않네요!</h1>
                </div>
            <Nav />
        </div>
    );
}

export default ErrorPage;