import style from './MessageView.module.css'
import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';
import classNames from 'classnames/bind';
import messageContent1 from '../../dummyData/SB/messageContent1';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MessageList1_ from '../../components/JSB/message/MessageList1_';
import BS2 from '../../components/JSB/BookShelf/BS2';
import bookData from '../../dummyData/SB/bookDetaiData';
//1. 메세지 뷰 - 거래중인 책 정보, 발신자 프로필, 메세지 콘텐츠, 메세지 답장하기 버튼이 있다. (0)
//2. 거래중인 책정보를 누르면 해당 상세페이지로 이동한다.( )
//3. 발신자 프로필에는 프로필사진(기본), 닉네임, 지역, like, dislike가 표시된다. (0)
//4. 메세지 답장하기를 누르면 메세지 쓰기 페이지로 이동한다. ( )

const MessageView=()=>{
    const cx = classNames.bind(style);
    const params = useParams();
    const sendMessage = messageContent1[params.id];
    const book = bookData[params.id]

    const [isOn, setIsOn] = useState();


    useEffect(()=>{
        const fetchData = async() => {
            try {
                const response = await axios.get(`http://localhost:8080/messages/received/1?pageNumber=1&size=10&sort=create_date_time,DESC`);
                setIsOn(response.data);
                console.log(response.data)
            }catch(error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])



    return(
        <>
        <Header2>수신메시지</Header2>
        <div className={cx('messageBoxV')}>
        <BS2 book={book}/>
            <p className={cx('mvtext')}>보낸 사람</p>
            <MessageList1_ sendMessage={sendMessage}/>
            <p className={cx('mvtext')}>메시지 내용</p>
            <div className={cx('viewContent')}>
                            <div key={sendMessage.id} className={cx('viewContent2')}>
                            {sendMessage.content}
                            </div>
            </div>
                <Link to={`/myPage/messageBox/write/${sendMessage.id-1}`}>
                <Button>메시지 답장하기</Button>
                </Link>
        </div>
        </>
    )
}

export default MessageView;




