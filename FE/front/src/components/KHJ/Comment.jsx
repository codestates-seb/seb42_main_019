function Comment({ comment }) {
    const isUser = true;
    return (
        <li key={comment.id}>
            <p>{comment.name}</p>
            <span>
                {isUser ?
                    (
                    <><button>Edit</button><button>Delete</button></>
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