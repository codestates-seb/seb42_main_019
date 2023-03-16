import Header2 from '../../components/common/Header2';
import Nav from '../../components/common/Nav';
import styles from './HJpage.module.css'

function ErrorPage() {
    return (
        <div className={styles.wrap}>
            <Header2 />
            <Nav />
        </div>
    );
}

export default ErrorPage;