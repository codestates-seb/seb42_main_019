import styles from './Nav.module.css';
import classNames from 'classnames/bind';
import { ReactComponent as IconHome } from '../../assets/IconHome.svg';
import { ReactComponent as IconAlert } from '../../assets/IconAlert.svg';
import { ReactComponent as IconBookplus } from '../../assets/Bookplus.svg';
import { ReactComponent as IconBooklist } from '../../assets/IconBooklist.svg';
import { ReactComponent as IconMypage } from '../../assets/IconMypage.svg';
import { Link } from 'react-router-dom';

function Navigation() {
  const cx = classNames.bind(styles);
  const domain = 'http://localhost:3000';
  const domainLength = domain.length;
  function findUrl(url){
    const pathFind = window.location.href;
    return pathFind.includes(url)
    // const path = pathFind.slice(domainLength+1, pathFind.length)
    // if(pathFind.includes(url) && path !== ''){
    //   return true;
    // }
    // if(path === ''){
    //   return true;
    // }
    // return false;
  }
  function homeUrlFind(){
    const pathFind = window.location.href;
    const path = pathFind.slice(domainLength+1, pathFind.length);
    if(path === ''){
      return true;
    }
  }
  return (
    <>
      <nav>
        <ul className={cx('nav')}>
          <li className={homeUrlFind() ? cx('nav--li', 'on') : cx('nav--li')}>
            <Link to='/'>
              <IconHome fill={homeUrlFind() ? '#2F5A2D' : '#D9D9D9'} />
              <span>홈</span>
            </Link>
          </li>
          <li className={findUrl('alert') ? cx('nav--li', 'on') : cx('nav--li')}>
            <Link to='/alert'>
              <IconAlert fill={findUrl('alert') ? '#2F5A2D' : '#D9D9D9'} />
              <span>알림</span>
            </Link>
          </li>
          <li className={findUrl('booklist') ? cx('nav--li', 'on') : cx('nav--li')}>
            <Link to='/createbook'>
              <IconBookplus fill={findUrl('booklist') ? '#2F5A2D' : '#D9D9D9'} />
              <span>책 등록</span>
            </Link>
          </li>
          <li className={findUrl('mybookshelf') ? cx('nav--li', 'on') : cx('nav--li')}>
            <Link to='/mybookshelf'>
              <IconBooklist fill={findUrl('mybookshelf') ? '#2F5A2D' : '#D9D9D9'} />
              <span>내 책장</span>
            </Link>
          </li>
          <li className={findUrl('mypage') ? cx('nav--li', 'on') : cx('nav--li')}>
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
