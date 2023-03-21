import { useEffect, useState } from 'react';
import {ReactComponent as EditBtn} from '../../assets/EditBtn.svg'
import {ReactComponent as XBtn} from '../../assets/XBtn.svg'

function Comment({ comment, idx, setCommentList, commentList}) {
    useEffect(() => {
        setContent(comment.content)
    }, [comment.content])
    const isUser = true;
    const [isContent, setContent] = useState(comment.content)
    const [isEdit, setEdit] = useState(false)

    const contentEdit = (e) => {
        setContent(e.target.value);
    }

    const edithandler = () => setEdit(!isEdit)
    const contentEditSave = (id, name, content) => {
        const editCom = {
            id,
            name,
            content
        };
        const editComList = [...commentList.slice(0,id), editCom, ...commentList.slice(id+1)];
        setCommentList(editComList);
        setEdit(!isEdit)
    }
    const editerble = () => {
        if(isUser){
            if(isEdit){
                return <>
                    <button><EditBtn onClick={() => contentEditSave(idx, comment.name, isContent)} /></button>
                    <button><XBtn onClick={() => {removeComment(idx)}} /></button>
                </>
            }else{
                return <>
                    <button><EditBtn onClick={edithandler}/></button>
                    <button><XBtn onClick={() => {removeComment(idx)}} /></button>
                </>
            }
        }
        return
    }

    const removeComment = (value) => {
        if(isEdit){
            return
        }
        const restComment = commentList.filter((comment, idx) => idx !== value);
        setCommentList(restComment)
    }

    return (
        <li key={comment.id}>
            <p>{comment.name}</p>
            <span>
                {editerble()}
            </span>
            {isEdit ?
                <input value={isContent} onChange={contentEdit}></input>
            :
                <b>{comment.content}</b>
            }
        </li>
    );
}

export default Comment;