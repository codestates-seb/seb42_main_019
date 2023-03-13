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
			<div className={style.box}>
				<Header />
				<img className={style.img} src={homeImg} alt='homeImg' />
				<HomeSearch />
				<BookList />
				<BookList />
				<BookList />
				<Footer className={style.footer} />
				<Nav />
			</div>
		</>
	);
}

export default Home;
