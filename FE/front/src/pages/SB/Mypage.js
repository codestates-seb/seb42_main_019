import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import style from './Mypage.module.css';
import Nav from '../../components/common/Nav';
import MessageList1 from '../../components/JSB/message/MessageList1';
import {TbBookUpload} from 'react-icons/tb'
import {BiMessageEdit} from 'react-icons/bi'
import {BiMessageCheck} from 'react-icons/bi'
import {TbMessages} from 'react-icons/tb'
import adimg from '../../assets/adimg.png';

const Mypage = ({children}) => {
    return(
        <>
        <Header>로그아웃</Header>
        <div className={style.mypageBox}>
            <MessageList1 />
            <p className={style.mptext}>나의 거래</p>
            <div className={style.mypageList}>
            <ul className={style.myPageUl}>
            <li className={style.mpList}><TbBookUpload size={32}/><button className={style.myPageBtn} >내가 교환한 책</button></li>
            <li className={style.mpList}><BiMessageEdit size={32} /><button className={style.myPageBtn} >내가 남긴 후기</button></li>
            <li className={style.mpList}><BiMessageCheck size={32} /><button className={style.myPageBtn} >내게 남긴 후기</button></li>
            <li className={style.mpList}><TbMessages size={32} /><button className={style.myPageBtn} >메시지함</button></li>
            </ul>
            <sapn className={style.checkoutT}>회원탈퇴</sapn>
            <div className={style.ADdiv}><button className={style.ADbtn}><img className={style.ADimg} src={adimg} alt='adimg' /></button> </div>
            </div>
        </div>
        <Footer />
        <Nav />
        </>
    )
}

export default Mypage;