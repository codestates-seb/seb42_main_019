import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {BiMessageCheck} from 'react-icons/bi'
import {TbMessages} from 'react-icons/tb'
import axios from '../../api/api';

import style from './MyPage.module.css';
import classNames from 'classnames/bind';

import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import MessageList1 from '../../components/JSB/message/MessageList1';
import adimg from '../../assets/adimg.png';
import DeleteProfile from '../../components/JSB/message/DeleteProfile';

//1. 로그아웃을 할 수있다. (0)
//2. 사용자 프로필을 확인할 수 있다. (0)
//3. 내가 보낸 메세지함으로 이동할 수 있다. ( )
//4. 내게 남긴 후기로 이동할 수 있다.( )
//5. 내가 받은 메세지함으로 이동할 수 있다. ( )
//6. 회원탈퇴를 할 수있다. ( )

const MyPage = () => {
    const cx = classNames.bind(style)
    const [profile, setProfile] = useState();
    const user = localStorage.getItem('userId')
    
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`/user/${user}`);
                console.log(user);
                setProfile(response.data);
            }catch(error){
                console.error(error);
            }
        };
        fetchData();
    },[]);

    return(
        <>
        <Header>로그아웃</Header>
        <div className={cx('mypageBox')}>
            {profile && (
            <div className={cx('messageList1Box')}>
            <MessageList1 profile={profile} />
            </div>)}
            <p className={cx('mptext')}>나의 거래</p>
            <div className={cx('mypageList')}>
                <ul className={cx('myPageUl')}>
                    <li className={cx('mpList')}>
                        <BiMessageCheck size={32} />
                            <Link to='./myRate' className={cx('myPageBtn')} >내게 남긴 후기</Link>
                    </li>
                    <li className={cx('mpList')}>
                        <TbMessages size={32} />
                            <Link to='./sendMessageBox' className={cx('myPageBtn')} >보낸 메시지함</Link>
                    </li>
                    <li className={cx('mpList')}>
                        <TbMessages size={32} />
                            <Link to='./receivedMessageBox' className={cx('myPageBtn')} >받은 메시지함</Link>
                    </li>
                </ul>
                <span className={cx('checkoutT')} onClick={DeleteProfile}>회원탈퇴</span>
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

export default MyPage;
