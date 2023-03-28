import styles from './Nav.module.css';
import classNames from 'classnames/bind';
import { ReactComponent as IconHome } from '../../assets/IconHome.svg';
import { ReactComponent as IconAlert } from '../../assets/IconAlert.svg';
import { ReactComponent as IconBookplus } from '../../assets/Bookplus.svg';
import { ReactComponent as IconBooklist } from '../../assets/IconBooklist.svg';
import { ReactComponent as IconMypage } from '../../assets/IconMypage.svg';
import { Link, useLocation } from 'react-router-dom';
import isLogin from './isLogin';

function Navigation() {
	const cx = classNames.bind(styles);
	const { pathname } = useLocation();

	function findUrl(url) {
		if (url === '' && pathname === '/') return true;

		if (pathname.includes(url) && url !== '') return true;

		return false;
	}

	return (
		<>
			<nav>
				<ul className={cx('nav')}>
					<li className={cx('nav--li', {on : findUrl('')})}>
						<Link to='/'>
							<IconHome fill={findUrl('') ? '#2F5A2D' : '#D9D9D9'} />
							<span>홈</span>
						</Link>
					</li>
					<li className={cx('nav--li', {on : findUrl('alert')})}>
						<Link to='/alert'>
							<IconAlert fill={findUrl('alert') ? '#2F5A2D' : '#D9D9D9'} />
							<span>알림</span>
						</Link>
					</li>
					<li className={cx('nav--li', {on : findUrl('createBook')})}>
						<Link to='/createBook'>
							<IconBookplus fill={findUrl('booklist') ? '#2F5A2D' : '#D9D9D9'} />
							<span>책 등록</span>
						</Link>
					</li>
					<li className={cx('nav--li', {on : findUrl('myBookShelf') })}>
						<Link to='/myBookShelf'>
							<IconBooklist fill={findUrl('myBookShelf') ? '#2F5A2D' : '#D9D9D9'} />
							<span>내 책장</span>
						</Link>
					</li>
					<li className={cx('nav--li', {on : findUrl('myPage')})} >
						<Link to='/myPage'>
							<IconMypage fill={findUrl('myPage') ? '#2F5A2D' : '#D9D9D9'} />
							<span>마이페이지</span>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default Navigation;
