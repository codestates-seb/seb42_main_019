import classNames from "classnames/bind";
import Comment from "./Comment";
import styles from "./CommentList.module.css"
import comment from "../../dummyData/comment";

function CommentList() {
    const cx = classNames.bind(styles);
    function commentIsEmpty(comment) {
        return comment.length === 0
    }

    return ( 
        <section className={cx('section')}>
            <h2 className={cx('h2')}>한줄평</h2>
            <ul className={cx('comment_list')}>
                {commentIsEmpty(comment) ?
                    <p className={cx('noComment')}>작성된 한줄평이 없습니다.</p>
                :
                    comment.map((el) => <Comment comment={el}/>)
                }
            </ul>
            <div className={cx('comment_plus')}>
                <input type={'text'} placeholder={'댓글 작성하기'} maxLength={'20'}></input>
                <button>작성</button>
            </div>
        </section>
    );
}

export default CommentList;