import style from './App.module.css';
import './style/CommonStyle.css';

import Home from './pages/SB/Home';
import Alert from './pages/SB/Alert';
import Mypage from './pages/SB/Mypage';
import Background from '../src/components/common/Background';
import Login from '../src/pages/JH/Login';
import BookSearch from '../src/pages/HJ/BookSearch';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/JH/SignUp';
import MessageView from './pages/SB/MessageView';
import MessageList02 from './pages/SB/MessageList02';
import CreateBook from './pages/JH/CreateBook';
import CustomerDetailView from './pages/JH/CustomerDetailView';
import BookSearchResult from './pages/HJ/BookSearchResult';
import UserRateList from './pages/HJ/UserRateList';
import MyRateList from './pages/HJ/MyRateList';
import MyBookShelf from './pages/SB/MyBookShelf';
import TradeBookList from './pages/SB/TradeBookList';
import ErrorPage from './pages/HJ/404';
import MessageWrite from './pages/SB/MessageWrite';
import SellerDetailView from './pages/JH/SellerDetailView';
import SellerDetailViewEdit from './pages/JH/SellerDetailViewEdit';


function App() {
	return (
		<div className={style.App}>
			<Background></Background>
			<div className={style.body}>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/alert' element={<Alert />}></Route>
					<Route path='/mypage' element={<Mypage />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/signup' element={<SignUp />}></Route>
					<Route path='/createbook' element={<CreateBook />}></Route>
					<Route
						path='/customerdetailview'
						element={<CustomerDetailView />}
					></Route>
					<Route
						path='/sellerdetailview'
						element={<SellerDetailView />}
					></Route>
					<Route
						path='/sellerdetailviewedit'
						element={<SellerDetailViewEdit />}
					></Route>
					<Route path='/booksearch' element={<BookSearchResult />}></Route>
					<Route path='/booksearchDetail' element={<BookSearch />}></Route>
					<Route path='/mypage/messagebox/view' element={<MessageView />}></Route>
					<Route path='/mybookshelf' element={<MyBookShelf />}></Route>
					<Route path='/mypage/messagebox' element={<MessageList02 />}></Route>
					<Route
						path='/mypage/tradebooklist'
						element={<TradeBookList />}
					></Route>
					<Route path='/userrate' element={<UserRateList />}></Route>
					<Route path='/myrate' element={<MyRateList />}></Route>
					<Route path='/error' element={<ErrorPage />}></Route>
					<Route path='/mypage/write' element={<MessageWrite />}></Route>
					{/*<Route path='/mycomment' element
					<Route path='/comments' element*/}
				</Routes>
			</div>
		</div>
	);
}

export default App;
