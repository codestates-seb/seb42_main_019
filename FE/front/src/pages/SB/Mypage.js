import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import style from './MyPage.module.css';
import Nav from '../../components/common/Nav';
import MessageList1 from '../../components/JSB/message/MessageList1';
import {BiMessageCheck} from 'react-icons/bi'
import {TbMessages} from 'react-icons/tb'
import adimg from '../../assets/adimg.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState ,useEffect } from 'react';
import axios from 'axios';
import api from '../../api/api';

const Mypage = () => {
    const cx = classNames.bind(style)

    const [accessToken, setAccessToken] = useState('');

    function updateAccessToken(newToken) {
        setAccessToken(newToken);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${api}/user`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [accessToken]);
    updateAccessToken()

    return(
        <>
        <Header>로그아웃</Header>
        <div className={cx('mypageBox')}>
            <div className={cx('messageList1Box')}>
            <MessageList1 />
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
                            <Link to='./messageBox' className={cx('myPageBtn')} >받은 메시지함</Link>
                    </li>
                    <li className={cx('mpList')}>
                        <TbMessages size={32} />
                            <Link to='./messageBox' className={cx('myPageBtn')} >보낸 메시지함</Link>
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