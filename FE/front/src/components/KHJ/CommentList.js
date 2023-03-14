import classNames from "classnames/bind";
import Comment from "./Comment";
import styles from "./CommentList.module.css"

function CommentList() {
    const cx = classNames.bind(styles);
    function commentIsEmpty(comment) {
        return comment.length === 0
    }
    const writer = [
        // {
        //     id : 1,
        //     name : '김코딩',
        //     content : '더 나은 프로그래머가 되려면 어떻게 해야 하나요?’라고 묻는 이에게 이 책을 추천한다.'
        // },
        // {
        //     id : 2,
        //     name : '박해커',
        //     content : '당신에게 추천하는 책'
        // },
        // {
        //     id : 3,
        //     name : '김코딩',
        //     content : '나는 새삥 모든게 다 새삥.'
        // },
        // {
        //     id : 4,
        //     name : '김코딩',
        //     content : '나는 새삥 모든게 다 새삥.'
        // }
    ]
    return ( 
        <section className={cx('section')}>
            <h2 className={cx('h2')}>한줄평</h2>
            <ul className={cx('comment_list')}>
                {commentIsEmpty(writer) ?
                    <p className={cx('noComment')}>작성된 한줄평이 없습니다.</p>
                :
                    writer.map((el) => <Comment writer={el}/>)
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