import classNames from "classnames";
import Comment from "./Comment";
import styles from "./Comment.module.css"

function CommentList() {
    const cx = classNames.bind(styles);
    const writer = [
        {
            id : 1,
            name : '김코딩',
            content : '더 나은 프로그래머가 되려면 어떻게 해야 하나요?’라고 묻는 이에게 이 책을 추천한다.'
        },
        {
            id : 2,
            name : '박해커',
            content : '당신에게 추천하는 책'
        },
        {
            id : 3,
            name : '김코딩',
            content : '나는 새삥 모든게 다 새삥.'
        }
    ]
    return ( 
        <section className="p20">
            <h2>한줄평</h2>
            <ul className={cx('comment_list')}>
                {writer.map((el) => <Comment writer={el}/>)}
            </ul>
            <div className={cx('comment_plus')}>
                <input type={'textarea'}></input>
                <button>작성</button>
            </div>
        </section>
    );
}

export default CommentList;