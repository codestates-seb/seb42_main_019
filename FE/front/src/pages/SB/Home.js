import style from './Home.module.css';
import homeImg from './../../assets/homeImg.png';
import Header from '../../components/common/Header';
import Search from '../../components/JSB/Search';
import Footer from '../../components/common/Footer';
import BookList from '../../components/common/BookList';
import Nav from '../../components/common/Nav';

function Home({children}) {
	return (
		<>
			<Header>로그인</Header>
			<div className={style.box}>
				<img className={style.img} src={homeImg} alt='homeImg' />
				<div className={style.text1}>
				<p className={style.homesearchp}>오늘 읽고 싶은 책?</p>
				</div>
				<Search />
				<p className={style.currentp}>최근에 등록된 책</p>
				<BookList />
				<BookList />
				<BookList />
				<BookList />
				<BookList />
				<Footer className={style.footer} />
			</div>
			<Nav />
		</>
	);
}

export default Home;
