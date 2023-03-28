import axios from '../../api/api';
import { useEffect, useState } from 'react';
import {ReactComponent as EditBtn} from '../../assets/EditBtn.svg'
import {ReactComponent as XBtn} from '../../assets/XBtn.svg'
import userIsCheck from '../common/userIsCheck';

function Comment({ comment, key, basicUrl, commentList, setCommentList }) {

    const [isContent, setContent] = useState(comment.content)
    const [isEdit, setEdit] = useState(false)

    const contentEdit = (e) => {
        setContent(e.target.value);
    }

    // PATCH
    const editComment = async () => {
        const url = `${basicUrl}/${key}`;
        try{
            const response = await axios({
                method: 'patch',
                url,
                content: isContent
            })
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
        if(userIsCheck()){
            if(isEdit){
                return <span>
                    <button><EditBtn onClick={() => setEdit(!isEdit)} /></button>
                    <button><XBtn onClick={() => {removeComment(key)}} /></button>
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
                <input value={isContent} onChange={contentEdit} maxLength='40'></input>
            :
                <b>{comment.content}</b>
            }
        </li>
    );
}

export default Comment;