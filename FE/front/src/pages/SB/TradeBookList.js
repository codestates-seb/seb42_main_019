import Header2 from '../../components/common/Header2';
import style from './TradeBookList.module.css';
import Nav from '../../components/common/Nav';
import BookShelf from '../../assets/bookshelf.png'
import classNames from 'classnames/bind';
import BS from '../../components/JSB/BookShelf/BS';
import Pagenation from '../../components/common/Pagenation';
import bookData from '../../dummyData/SB/bookData';

const TradeBookList = () => {
	const cx = classNames.bind(style);

    return(
        <>
        <Header2>내가 교환한 책</Header2>
        <div className={cx('tblBox')}>
        <div className={cx('tblImgBox')}>
        <img src={BookShelf} className={cx('tblimg')} alt='tblimg' />
        </div>
        <div className={cx('tblBody')}>
        <p className={cx('tblText')}>내가 받은 책들</p>
        {bookData.map((el)=><BS bookData={el}/>)}
        </div>
        <Pagenation />
        </div>
        <Nav />
        </>
    )
}

export default TradeBookList;




