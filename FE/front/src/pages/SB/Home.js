import style from './Home.module.css';
import homeImg from './../../assets/homeImg.png';
import Header from '../../components/common/Header';
import HomeSearch from '../../components/JSB/HomeSearch';
import Footer from '../../components/common/Footer';
import BookList from '../../components/common/BookList';
import Nav from '../../components/common/Nav'

function Home() {
	return (
		<>
		<Header />
			<div className={style.box}>
				<img className={style.img} src={homeImg} alt='homeImg' />
				<HomeSearch />
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
