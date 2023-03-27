import { authStateSelector } from '../../States/LoginState';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import {BiMessageCheck} from 'react-icons/bi'
import {TbMessages} from 'react-icons/tb'

import style from './MyPage.module.css';
import classNames from 'classnames/bind';

import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import MessageList1 from '../../components/JSB/message/MessageList1';
import adimg from '../../assets/adimg.png';

//1. 로그아웃을 할 수있다.
//2. 사용자 프로필을 확인할 수 있다,
//3. 내가 교환한 책으로 이동할 수 있다.
//4. 내게 남긴 후기로 이동할 수 있다.
//5. 메세지함으로 이동할 수 있다.
//6. 회원탈퇴를 할 수있다.

const Mypage = () => {
    const cx = classNames.bind(style)
    const { name, region, likeCount, disLikeCount } = useRecoilValue(authStateSelector);    

    return(
        <>
        <Header>로그아웃</Header>
        <div className={cx('mypageBox')}>
            <div className={cx('messageList1Box')}>
            <MessageList1 name={name} region={region} likeCount={likeCount} disLikeCount={disLikeCount} />
            </div>
            <p className={cx('mptext')}>나의 거래</p>
            <div className={cx('mypageList')}>
                <ul className={cx('myPageUl')}>
                    <li className={cx('mpList')}>
                        <BiMessageCheck size={32} />
                            <Link to='./myRate' className={cx('myPageBtn')} >내게 남긴 후기</Link>
                    </li>
                    <li className={cx('mpList')}>
                        <TbMessages size={32} />
                            <Link to='./messageBox' className={cx('myPageBtn')} >보낸 메시지함</Link>
                    </li>
                    <li className={cx('mpList')}>
                        <TbMessages size={32} />
                            <Link to='./messageBox' className={cx('myPageBtn')} >받은 메시지함</Link>
                    </li>
                </ul>
                <span className={cx('checkoutT')}>회원탈퇴</span>
                <div className={cx('ADdiv')}>
                    <button className={cx('ADbtn')}>
                        <img className={cx('ADimg')} src={adimg} alt='adimg' />
                    </button>
                </div>
            </div>
        </div>
        <Footer />
        <Nav />
        </>
    )
}

export default Mypage;
