import style from './App.module.css';
import Nav from './components/common/Nav';
import Home from './pages/SB/Home'
import Alert from './pages/SB/Alert'
import Bookplus from './pages/JH/CreateBook'
import Booklist from './pages/SB/MyBookShelf'
import Mypage from './pages/SB/Mypage'
import Background from '../src/components/common/Background';
import Login from '../src/pages/JH/Login';
import BookSearch from '../src/pages/HJ/BookSearch';
import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className={style.App}>
			<Background>
			</Background>
			<div className={style.body}>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/alert' element={<Alert />}></Route>
					<Route path='/bookplus' element={<Bookplus/>}></Route>
					<Route path='/booklist' element={<Booklist />}></Route>
					<Route path='/mypage' element={<Mypage />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/booksearch' element={<BookSearch />}></Route>
				</Routes>
				<Nav />
				</div>
		</div>
	);
}

export default App;
