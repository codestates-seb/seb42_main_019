import style from './App.module.css';
import Nav from './components/common/Nav';
import Background from '../src/components/common/Background';
import Login from '../src/pages/JH/Login';

function App() {
	return (
		<div className={style.App}>
			<Background></Background>
			<div className={style.body}>
				<Login />
				<Nav />
			</div>
		</div>
	);
}

export default App;
