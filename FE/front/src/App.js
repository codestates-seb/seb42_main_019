import './App.css';
import Header from './components/common/Header';
// eslint-disable-next-line import/no-unresolved
import Header2 from './components/common/Header2';

function App() {
	return (
		<div className='App'>

			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn Reac
				</a>
			</header>
		</div>
	);
}

export default App;
