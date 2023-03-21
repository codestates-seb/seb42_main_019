import classNames from "classnames/bind";
import Comment from "./Comment";
import styles from "./CommentList.module.css"
import comment from "../../dummyData/comment";
import { useState } from "react";

function CommentList() {
    const cx = classNames.bind(styles);
    function commentIsEmpty(comment) {
        return comment.length === 0
    }

    const [commentList, setCommentList] = useState(comment);
    const [isContent, setContent] = useState('');
    const [isUsername, setUsername] = useState('현재유저네임');
    const onChange = (e) => setContent(e.target.value);
    function addComment(){
        const content ={
            id : commentList.length +1,
            name : isUsername,
            content : isContent
        }
        const newCommentList = [...commentList, content]
        setCommentList(newCommentList);
        setContent('')
    }

    return ( 
        <section className={cx('section')}>
            <h2 className={cx('h2')}>한줄평</h2>
            <ul className={cx('comment_list')}>
                {commentIsEmpty(commentList) ?
                    <p className={cx('noComment')}>작성된 한줄평이 없습니다.</p>
                :
                    commentList.map((el, idx) =>
                    <Comment
                    comment={el}
                    idx={idx}
                    isUsername={isUsername}
                    setCommentList={setCommentList}
                    commentList={commentList}
                    />
                    )
                }
            </ul>
            <div className={cx('comment_plus')}>
                <input value={isContent} onChange={onChange} type={'text'} placeholder={'댓글 작성하기'} maxLength={'40'}></input>
                <button onClick={addComment}>작성</button>
            </div>
        </section>
    );
}

export default CommentList;