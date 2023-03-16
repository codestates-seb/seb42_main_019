import {ReactComponent as EditBtn} from '../../assets/EditBtn.svg'
import {ReactComponent as XBtn} from '../../assets/XBtn.svg'

function Comment({ comment }) {
    const isUser = true;
    return (
        <li key={comment.id}>
            <p>{comment.name}</p>
            <span>
                {isUser ?
                    (
                    <><button><EditBtn /></button><button><XBtn /></button></>
                    )
                    :
                    null
                }
            </span>
            <b>{comment.content}</b>
        </li>
    );
}

export default Comment;