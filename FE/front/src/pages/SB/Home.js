import style from './Home.module.css';
import homeImg from './../../assets/homeImg.png';
import Header from '../../components/common/Header';
import Search from '../../components/JSB/Search';
import Footer from '../../components/common/Footer';
import BookList from '../../components/common/BookList';
import Nav from '../../components/common/Nav';
import classNames from 'classnames/bind';

function Home() {
	const cx = classNames.bind(style);


	return (
		<>
			<Header>로그인</Header>
			<div className={cx('boxAll')}>
			<div className={cx('box')}>
				<img className={cx('img')} src={homeImg} alt='homeImg' />
				<div className={cx('text1')}>
				<p className={cx('homeSearchP')}>오늘 읽고 싶은 책?</p>
				</div>
				<Search />
			</div>
			</div>
			<Nav />
		</>
	);
}

export default Home;
