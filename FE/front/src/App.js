import style from './App.module.css';
import Nav from './components/common/Nav';
import Header2 from './components/common/Header2';
import Background from '../src/components/common/Background';
import Login from '../src/pages/JH/Login';

function App() {
	return (
		<div className={style.App}>
			<Background></Background>
			<div className={style.body}>
				<Header2 />
				<Login />
				<Nav />
			</div>
		</div>
	);
}

export default App;
