import classNames from "classnames/bind";
import Comment from "./Comment";
import styles from "./CommentList.module.css"
import { useEffect, useState } from "react";
import axios from "../../api/api";

function CommentList( { bookId } ) {
    const cx = classNames.bind(styles);
    const basicUrl = `/books/${bookId}/commnet`

    // GET
    const [commentList, setCommentList] = useState([]);
    function commentIsEmpty(comment) {
        return comment.length === 0
    };

    const [currentPage, setCurrentPage] = useState(1)
    
    const getCommentList = async () => {
        const url = `${basicUrl}?pageNumber=${currentPage}&size=20&sort=book_comment_id,desc`
        try {
            const response = await axios({
                method: 'get',
                url
            })
            const { data } = response;
            const { pageInfo } = response;
            setCommentList(data);
            setCurrentPage(pageInfo.totalPages);
        } catch(err) {
            console.log(err);
        };
    };

    useEffect(() => {
        getCommentList();
    },[]);

    // CREATE
    const [isContent, setContent] = useState('');

    const onSubmit = (e) => {
        e.preventDefalut()
        setContent(e.target.value);
        if(e.key === 'Enter'){
            addComment();
        };
    };
    
    const addComment = async () => {
        const url = `${basicUrl}`;
        const content = {
            "content" : isContent.content
        }
        try {
            const response = await axios({
                method: 'post',
                url,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` ,
                    'Content-Type': 'application/json',
                    withCredentials : true
                },
                data : content
            });
            setCommentList([response.data ,commentList])
        } catch (err) {
            console.log(err);
        }
    };

    return ( 
        <section className={cx('section')}>
            <h2 className={cx('h2')}>한줄평</h2>
            <ul className={cx('comment_list')}>
                {commentIsEmpty(commentList) ?
                    <p className={cx('noComment')}>작성된 한줄평이 없습니다.</p>
                :
                    commentList.map((el) =>
                        <Comment
                            comment={el}
                            key={el.bookCommentId}
                            basicUrl={basicUrl}
                            commentList={commentList}
                            setCommentList={setCommentList}
                        />
                    )
                }
            </ul>
            <div className={cx('comment_plus')}>
                <input value={isContent} onKeyUp={onSubmit} type={'text'} placeholder={'댓글 작성하기'} maxLength={'40'}></input>
                <button onClick={addComment}>작성</button>
            </div>
        </section>
    );
}

export default CommentList;