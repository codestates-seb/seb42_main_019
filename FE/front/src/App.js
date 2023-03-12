import style from './App.module.css';
import Header from './components/common/Header';
import homeImg from './assets/homeImg.png';
import Home_main1 from './components/JSB/Home_main1';
import Footer from './components/common/Footer';

function App() {
	return (
		<div className={style.App}>
			<div className={style.box}>
				<Header />
				<img className={style.img} src={homeImg} alt='homeImg' />
				<Home_main1 />
				<Footer />
			</div>
		</div>
	);
}

export default App;
