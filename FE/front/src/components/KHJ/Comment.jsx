function Comment({ writer }) {
    const isUser = true;
    return (
        <li key={writer.id}>
            <p>{writer.name}</p>
            <span>
                {isUser ?
                    (
                    <><button>Edit</button><button>Delete</button></>
                    )
                    :
                    null
                }
            </span>
            <b>{writer.content}</b>
        </li>
    );
}

export default Comment;