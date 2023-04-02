import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav';
import styles from './UserRateList.css'
import Profile from '../../components/KHJ/Profile'
import Modal from "./M_CommentCreate";
import Rate from "../../components/KHJ/Rate";

function UserRate() {
    const cx = classNames.bind(styles);
    const params = useParams();
    const bookId = params.messagesId;
    const [ratedata, setRatedata] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [userId, setUserId] = useState(0);

    const bookInfo = async () => {
        const url = `/messages/sent/?pageNumber=1&size=10&sort=create_date_time,DESC`;
        try {
            const res = await api ({
                method: 'get',
                url
            })
            console.log(res.data.data[bookId]);
            console.log(res.data.data[bookId]);
            setUserdata(res.data.data[bookId].receiver);
            setUserId(res.data.data[bookId].receiver.userId);
            await getRate();
        } catch (error) {
            console.log(error);
        };
    };

    const getRate = async () => {
        try{
            const url = `/user/${userId}/comment?pageNumber=${pageNum}&size=20&sort=comment_id,desc`
            const response = await api({
                method:'get',
                url
            })
            setRatedata(response.data.data);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        bookInfo();
    }, []);

    function isData() {
        if(ratedata.length === 0) return true;
        return false;
    }

    function isUserData() {
        if(userdata.length === 0) return true;
        return false;
    }

    function isOwn () {
        if(Number(localStorage.getItem('userId')) === userdata.userId) return true;
        return false;
    }
    
    return (
        <>
            <Header2>이 유저에게 남긴 후기</Header2>
            <main>
                {isUserData() ?
                    <p style={{textAlign:'center', lineHeight:'200px'}}>로딩중입니다!...</p>
                    : <Profile profile={userdata} bookInfo={bookInfo}/>
                }
                {isData() ?
                    <p style={{textAlign:'center', lineHeight:'200px'}}>후기가 없습니다.</p>
                    :
                    <ul className={cx('list')}>
                        {ratedata.map((el) => (<Rate getRate={getRate} key={el.commentId} ratedata={el}/>))}
                    </ul>
                }
                <div className={cx('wrap')}>
                    {!isOwn() && <Modal userId={userId} getRate={getRate}>후기 작성하기</Modal>}
                </div>
            </main>
            <Nav />
        </>
    );
}

export default UserRate;
