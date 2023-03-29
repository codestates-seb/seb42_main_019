
import { useEffect, useState } from 'react';
import {ReactComponent as EditBtn} from '../../assets/EditBtn.svg'
import {ReactComponent as XBtn} from '../../assets/XBtn.svg'
import axios from '../../api/api';

function Comment({ comment, basicUrl, commentList, setCommentList }) {
    const key = comment.bookCommentId;

    const [isContent, setContent] = useState(comment.content);
    const [isEdit, setEdit] = useState(false);
    
    const userId = localStorage.getItem('userId')
    const isUser = () => Number(userId) === Number(comment.userId);

    // 보안용 유저체크 구현 실패
    // {/*const [isUser, setIsUser] = useState(false);*/}

    // const userChk = async () => {
    //     const url = `/user/${userId}`
    //     try{
    //         const response = await axios({
    //             method: 'get',
    //             url
    //         })
    //         console.log(response);
    //         setIsUser(true);
    //     } catch(err) {
    //         console.log(err)
    //     };
    // };

    // useEffect(() => {
    //     userChk();
    // }, [])

    const contentEdit = (e) => {
        setContent(e.target.value);
    };

    // PATCH
    const editComment = async () => {
        const url = `/books/${comment.bookId}/comment/${key}`;
        const content = {
            content : `${isContent}`
        }
        console.log(content)
        try{
            const response = await axios({
                method: 'patch',
                url,
                data: content
            })
            console.log(response);
        } catch (err) {
            console.log(err);
        }
        setEdit(!isEdit);
    }

    // DELETE
    const removeComment = async () => {
        const url = `${basicUrl}/${key}`
        try {
            await axios({
                method: 'delete',
                url
            })
        } catch (err) {
            console.log(err)
        };
    };

    const handleDelete = () => {
        const result = window.confirm("삭제하시겠습니까?");
        if(result) {
            removeComment();
            setCommentList(commentList.filter((el) => el.bookCommentId !== key))
        }
    }

    const editerble = () => {
        if(isUser()){
            if(!isEdit){
                return <span>
                    <button><EditBtn onClick={() => setEdit(!isEdit)} /></button>
                    <button><XBtn onClick={() => {handleDelete(key)}} /></button>
                </span>
            }else{
                return <span>
                    <button><EditBtn onClick={editComment}/></button>
                    <button><XBtn onClick={() => {handleDelete(key)}} /></button>
                </span>
            };
        };
    };

    return (
        <li key={key}>
            <p>{comment.userName}</p>
            {editerble()}
            {isEdit ?
                <input value={isContent} onChange={(e) => contentEdit(e)} maxLength='40'></input>
            :
                <b>{isContent}</b>
            }
        </li>
    );
}

export default Comment;