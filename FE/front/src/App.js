import style from './App.module.css';
import Background from '../src/components/common/Background';
import Home from './pages/SB/Home'

function App() {
	return (
		<div className={style.App}>
			<Background>
			</Background>
			<div className={style.body}>
			<Home />
				</div>
		</div>
	);
}

export default App;
