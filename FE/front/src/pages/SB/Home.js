import style from './Home.module.css';
import homeImg from './../../assets/homeImg.png';
import Header from '../../components/common/Header';
import Search from '../../components/JSB/Search';
import Footer from '../../components/common/Footer';
import BookList from '../../components/common/BookList';
import Nav from '../../components/common/Nav';
import classNames from 'classnames/bind';

//1. 검색 키워드를 입력하고 엔터를 누르면 검색결과페이지로 이동한다.(0)
//2. 로그인 페이지로 이동한다.(0)
//3. 최근에 등록된 책 리스트를 누르면 해당 책 상세페이지로 이동한다.

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
