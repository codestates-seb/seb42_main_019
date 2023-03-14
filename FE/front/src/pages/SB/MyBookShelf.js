import Header2 from 'src/components/common/Header2';
import style from './MyBookShelf.module.css';
import Nav from '../../components/common/Nav';
import BookShelf from '../../assets/bookshelf.png'
import classNames from 'classnames/bind';
import BSlist from 'src/components/JSB/BookShelf/BSlist';
import Pagenation from '../../components/common/Pagenation';

const MyBookShelf = () => {
	const cx = classNames.bind(style);

    return(
        <>
        <Header2>내 책장</Header2>
        <div className={cx('mbsBox')}>
        <div className={cx('mbsImgBox')}>
        <img src={BookShelf} className={cx('mbsimg')} alt='mbsimg' />
        </div>
        <div className={cx('mbsBody')}>
        <p className={cx('mbsText')}>내가 등록한 책</p>
        <BSlist />
        </div>
        <Pagenation />
        </div>
        <Nav />
        </>
    )
}

export default MyBookShelf;