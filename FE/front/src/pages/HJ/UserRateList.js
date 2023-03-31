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
    const userId = params.userid;
    const [ratedata, setRatedata] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [pageNum, setPageNum] = useState(1);

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
    }
    const bookInfo = async () => {
        const url = `/books/${userId}`;
        try {
            const res = await api ({
                method: 'get',
                url
            })
            setUserdata(res.data.user)
        } catch (error) {
            console.log(error);
        };
    }

    useEffect(() => {
        getRate();
        bookInfo();
    }, [])

    function isData() {
        if(ratedata.length === 0) return true;
        return false;
    }

    function isUserData() {
        if(userdata.length === 0) return true;
        return false;
    }

    return (
        <>
            <Header2>이 유저에게 남긴 후기</Header2>
            <main>
                {isUserData() ?
                    <p>로딩중입니다!...</p>
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
                    <Modal getRate={getRate}>후기 작성하기</Modal>
                </div>
            </main>
            <Nav />
        </>
    );
}

export default UserRate;
