import { Route, Routes } from 'react-router-dom';
import style from './App.module.css';
import './style/CommonStyle.css';

import Home from './pages/SB/Home';
import Alert from './pages/SB/Alert';
import MyPage from './pages/SB/MyPage';
import Background from '../src/components/common/Background';
import Login from '../src/pages/JH/Login';
import BookSearch from '../src/pages/HJ/BookSearch';
import SignUp from './pages/JH/SignUp';
import MessageView from './pages/SB/MessageView';
import MessageList02 from './pages/SB/MessageList02';
import CreateBook from './pages/JH/CreateBook';
import CustomerDetailView from './pages/JH/CustomerDetailView';
import BookSearchResult from './pages/HJ/BookSearchResult';
import UserRateList from './pages/HJ/UserRateList';
import MyBookShelf from './pages/SB/MyBookShelf';
import ErrorPage from './pages/HJ/404';
import Missing from './pages/HJ/Missing';
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
					<Route path='/login' element={<Login />}></Route>
					<Route path='/signUp' element={<SignUp />}></Route>
					
					<Route path='/alert' element={<Alert />}></Route>

					<Route path='/createBook' element={<CreateBook />}></Route>

					<Route path='/customerDetailView' element={<CustomerDetailView />}></Route>
					<Route path='/sellerDetailView' element={<SellerDetailView />}></Route>
					<Route path='/sellerDetailView/edit' element={<SellerDetailViewEdit />}></Route>

					<Route path='/search' element={<BookSearchResult />}></Route>
					<Route path='/search/detail' element={<BookSearch />}></Route>
					<Route path='/search/detail/:isbn' element={<BookSearch />}></Route>

					<Route path='/myPage' element={<MyPage />}></Route>
					<Route path='/myPage/messageBox' element={<MessageList02 />}></Route>
					<Route path='/myPage/messageBox/:id' element={<MessageView />}></Route>
					<Route path='/myPage/messageBox/write' element={<MessageWrite />}></Route>
					
					<Route path='/myBookShelf' element={<MyBookShelf />}></Route>
					
					<Route path='/myPage/myRate' element={<UserRateList />}></Route>

					<Route path='/*' element={<ErrorPage />}></Route>
					<Route path='/missing' element={<Missing />}></Route>

        </Routes>

			</div>
		</div>
	);
}

export default App;
