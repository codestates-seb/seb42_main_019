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
import CreateBook from './pages/JH/CreateBook';
import CustomerDetailView from './pages/JH/CustomerDetailView';
import BookSearchResult from './pages/HJ/BookSearchResult';
import UserRateList from './pages/HJ/UserRateList';
import MyRateList from './pages/HJ/MyRateList';
import MyBookShelf from './pages/SB/MyBookShelf';
import ErrorPage from './pages/HJ/404';
import Missing from './pages/HJ/Missing';
import MessageWrite from './pages/SB/MessageWrite';
import SellerDetailView from './pages/JH/SellerDetailView';
import SellerDetailViewEdit from './pages/JH/SellerDetailViewEdit';
import SendMessages from './pages/SB/SendMessages';
import ReceivedMessages from './pages/SB/ReceivedMessages';
import PrivateRoutes from './States/PrivateRoutes';

function App() {
	return (
		<div className={style.App}>
			<Background></Background>
			<div className={style.body}>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/signUp' element={<SignUp />}></Route>
          
					<Route
						path='/userRate/:userid'
						element={<UserRateList
					/>}></Route>
					
					<Route
						path='/customer/detailView/:bookId'
						element={<CustomerDetailView />}
					></Route>

					<Route path='/search' element={<BookSearchResult />}></Route>
					<Route path='/search/detail/:isbn' element={<BookSearch />}></Route>

					<Route path='/*' element={<ErrorPage />}></Route>
					<Route path='/missing' element={<Missing />}></Route>

					<Route element={<PrivateRoutes />}>

						<Route path='/createBook' element={<CreateBook />}></Route>
						
						<Route
							path='/seller/detailView'
							element={<SellerDetailView />}
						></Route>
						<Route
							path='/seller/detailView/edit'
							element={<SellerDetailViewEdit />}
						></Route>

						<Route path='/myPage' element={<MyPage />}></Route>
						<Route
							path='/myPage/messageBox'
							element={<ReceivedMessages />}
						></Route>
						<Route
							path='/myPage/messageBox1'
							element={<SendMessages />}
						></Route>
						<Route
							path='/myPage/messageBox/:id'
							element={<MessageView />}
						></Route>
						<Route
							path='/myPage/messageBox/write'
							element={<MessageWrite />}
						></Route>

						<Route path='/alert' element={<Alert />}></Route>
            
						<Route path='/myPage/myRate' element={<MyRateList />}></Route>
            
						<Route path='/myBookShelf' element={<MyBookShelf />}></Route>
					</Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
