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
  const [currentPage, setCurrentPage] = useState('');
  function findUrl(url){
    const pathFind = window.location.href;
    return pathFind.includes(url)
  }
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
          <li className={!findUrl('alert') ? cx('nav--li') : cx('nav--li', 'on')}>
            <Link to='/alert'>
              <IconAlert fill={findUrl('alert') ? '#2F5A2D' : '#D9D9D9'} />
              <span>알림</span>
            </Link>
          </li>
          <li className={!findUrl('createbook') ? cx('nav--li') : cx('nav--li', 'on')}>
            <Link to='/createbook'>
              <IconBookplus fill={findUrl('createbook') ? '#2F5A2D' : '#D9D9D9'} />
              <span>책 등록</span>
            </Link>
          </li>
          <li className={!findUrl('mybookshelf') ? cx('nav--li') : cx('nav--li', 'on')}>
            <Link to='/mybookshelf'>
              <IconBooklist fill={findUrl('mybookshelf') ? '#2F5A2D' : '#D9D9D9'} />
              <span>내 책장</span>
            </Link>
          </li>
          <li className={!findUrl('mypage') ? cx('nav--li') : cx('nav--li', 'on')}>
            <Link to='/mypage'>
              <IconMypage fill={findUrl('mypage') ? '#2F5A2D' : '#D9D9D9'} />
              <span>마이페이지</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
