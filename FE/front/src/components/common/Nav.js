import styles from './Nav.module.css';
import classNames from 'classnames/bind';
import { ReactComponent as IconHome } from '../../assets/IconHome.svg';
import { ReactComponent as IconAlert } from '../../assets/IconAlert.svg';
import { ReactComponent as IconBookplus } from '../../assets/Bookplus.svg';
import { ReactComponent as IconBooklist } from '../../assets/IconBooklist.svg';
import { ReactComponent as IconMypage } from '../../assets/IconMypage.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navigation() {
  const cx = classNames.bind(styles);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  return (
    <>
      <nav>
        <ul className={cx('nav')}>
          <li className={cx('nav--li')}>
            <Link to='/' onClick={() => setCurrentPage(1)}>
              <IconHome fill={currentPage === 1 ? '#2F5A2D' : '#D9D9D9'} />
              <span>홈</span>
            </Link>
          </li>
          <li className={cx('nav--li')}>
            <Link to='/alert' onClick={() => setCurrentPage(2)}>
              <IconAlert fill={currentPage === 2 ? '#2F5A2D' : '#D9D9D9'} />
              <span>알림</span>
            </Link>
          </li>
          <li className={cx('nav--li')}>
            <Link to='/createbook' onClick={() => setCurrentPage(3)}>
              <IconBookplus fill={currentPage === 3 ? '#2F5A2D' : '#D9D9D9'} />
              <span>책 등록</span>
            </Link>
          </li>
          <li className={cx('nav--li')}>
            <Link to='/mybookshelf' onClick={() => setCurrentPage(4)}>
              <IconBooklist fill={currentPage === 4 ? '#2F5A2D' : '#D9D9D9'} />
              <span>내 책장</span>
            </Link>
          </li>
          <li className={cx('nav--li')}>
            <Link to='/mypage' onClick={() => setCurrentPage(5)}>
              <IconMypage fill={currentPage === 5 ? '#2F5A2D' : '#D9D9D9'} />
              <span>마이페이지</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
