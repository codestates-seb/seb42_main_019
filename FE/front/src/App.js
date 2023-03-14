import style from './App.module.css';

import Home from './pages/SB/Home';
import Alert from './pages/SB/Alert';
import Bookplus from './pages/JH/CreateBook';
import Booklist from './pages/SB/MyBookShelf';
import Mypage from './pages/SB/Mypage';
import Background from '../src/components/common/Background';
import Login from '../src/pages/JH/Login';
import BookSearch from '../src/pages/HJ/BookSearch';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/JH/SignUp';
import MessageView from './pages/SB/MessageView';
import MessageList02 from './pages/SB/MessageList02';

function App() {
	return (
		<div className={style.App}>
			<Background></Background>
			<div className={style.body}>

				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/alert' element={<Alert />}></Route>
					<Route path='/bookplus' element={<Bookplus />}></Route>
					<Route path='/booklist' element={<Booklist />}></Route>
					<Route path='/mypage' element={<Mypage />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/signup' element={<SignUp />}></Route>
					<Route path='/booksearch' element={<BookSearch />}></Route>
					<Route path='/message' element={<MessageView />}></Route>
					<Route path='/messages' element={<MessageList02 />}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
