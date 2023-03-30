import classNames from "classnames/bind";
import Comment from "./Comment";
import styles from "./CommentList.module.css"
import { useEffect, useState } from "react";
import axios from "../../api/api";
import CreateBookComment from "./CreateBookComment";

function CommentList( { bookId } ) {
    const cx = classNames.bind(styles);
    const basicUrl = `/books/${bookId}/comment`

    // GET
    const [commentList, setCommentList] = useState([]);
    function commentIsEmpty(comment) {
        return comment.length === 0
    };

    const [currentPage, setCurrentPage] = useState(1);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getCommentList = async () => {
        const url = `${basicUrl}?pageNumber=${currentPage}&size=20&sort=book_comment_id,desc`
        try {
            const response = await axios({
                method: 'get',
                url
            })
            const { data } = response.data;
            const { pageInfo } = response.data;
            setCommentList(data);
            setCurrentPage(pageInfo.totalPages);
        } catch(err) {
            console.log(err);
        };
    };

    useEffect(() => {
        getCommentList();
    },[]);


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
                            basicUrl={basicUrl}
                            commentList={commentList}
                            setCommentList={setCommentList}
                            getCommentList={getCommentList}
                        />
                    )
                }
            </ul>
            <CreateBookComment
                basicUrl={basicUrl}
                commentList={commentList}
                setCommentList={setCommentList}
                getCommentList={getCommentList}
            />
        </section>
    );
};

export default CommentList;