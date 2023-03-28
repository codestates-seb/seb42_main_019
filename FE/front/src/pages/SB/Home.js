import style from './Home.module.css';
import classNames from 'classnames/bind';

import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import Search from '../../components/JSB/Search';
import homeImg from './../../assets/homeImg.png';

function Home() {
	const cx = classNames.bind(style);

	//1. 검색 키워드를 입력하고 엔터를 누르면 검색결과페이지로 이동한다.(0)
	//2. 로그인 페이지로 이동한다.(0)
	//4. 로그인 전에는 <Header>로그인</Header> 이고 로그인 후에는 <Header>로그아웃</Header> 이다. (9)

	return (
		<>
			<Header/>
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
