function Comment({ writer }) {
    const isUser = true;
    return (
        <li key={writer.id}>
            <p>{writer.name}</p>
            <p>{writer.content}</p>
            {isUser ?
                (
                <><button>Edit</button><button>Delete</button></>
                )
            :
            null
            }
        </li>
    );
}

export default Comment;