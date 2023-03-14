import Header2 from 'src/components/common/Header2';
import style from './TradeBookList.module.css';
import Nav from '../../components/common/Nav';
import BookShelf from '../../assets/bookshelf.png'
import classNames from 'classnames/bind';
import BSlist from 'src/components/JSB/BookShelf/BSlist';

const TradeBookList = () => {
	const cx = classNames.bind(style);

    return(
        <>
        <Header2>내가 교환받은 책</Header2>
        <div className={cx('tblBox')}>
        <div className={cx('tblImgBox')}>
        <img src={BookShelf} className={cx('tblimg')} alt='tblimg' />
        </div>
        <div className={cx('tblBody')}>
        <p className={cx('tblText')}>내가 받은 책들</p>
        <BSlist />
        </div>
        </div>
        <Nav />
        </>
    )
}

export default TradeBookList;