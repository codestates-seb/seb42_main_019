import style from './App.module.css';
import Home from './pages/SB/Home';
import Nav from './components/common/Nav'

function App() {
	return (
		<div className={style.App}>
			<Home />
			<Nav />
		</div>
	);
}

export default App;
