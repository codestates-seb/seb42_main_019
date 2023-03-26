import Header2 from '../../components/common/Header2';
import style from './MessageList02.module.css'
import Nav from '../../components/common/Nav';
import MessageList3 from '../../components/JSB/message/MessageList3';
import classNames from 'classnames';
import messageContent1 from '../../dummyData/SB/messageContent1';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//1. 메세지함 - 각 리스트에 발신자, 콘텐츠미리보기, 발신일자를 표시한다.
//2. 각 리스트를 누르면 각 아이디에 맞는 메세지뷰페이지로 이동한다.(o)
//3. 각 리스트 아이콘을 누르면 해당 리스트가 삭제된다. (더블클릭삭제로 구현) ()
//4. 전체 리스트를 삭제할 수 있다.

const MessageList02 = () => {
    const cx = classNames.bind(style)
	const [isOn, setIsOn] = useState(messageContent1);
    const history = useNavigate();

    useEffect(()=>{
        const savedIsOns = localStorage.getItem('isOn');
        if(savedIsOns){
            setIsOn(JSON.parse(savedIsOns));
        }
    }, []);
    
    const handleClick = (id) =>{
        const updatedList = isOn.filter(isOn => isOn.id !== id)
        setIsOn(updatedList);
        localStorage.setItem('isOn', JSON.stringify(updatedList));
        console.log(isOn[9].id)
    }

    const handleClick2 = (id)=>{
        const updatedList = []
        setIsOn(updatedList);
        localStorage.setItem('isOn',JSON.stringify(updatedList));
        history('/myPage/messageBox');
    }

 
    return(
        <>
        <Header2>받은 메세지</Header2>
        <div onClick={()=>{handleClick2(isOn.id)}} className={style.box1}>
            <div className={style.notFooter}>
                <div className={style.listboxMessage}> Delete All Message! </div>
            </div>
        </div> 
            <div onClick={()=>{handleClick(isOn.id)}}  className={cx('map', { 'clicked': isOn })}>
            {isOn.map((el)=> 
                <Link to={`/myPage/messageBox/view/${el.id-1}`}>
                <MessageList3 key={el.id} messageContent1={el}/>
                </Link>)}
            </div>
        
        <Nav />
        </>
    )
}

export default MessageList02;