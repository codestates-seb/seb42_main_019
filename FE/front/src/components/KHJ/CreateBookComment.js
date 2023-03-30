import classNames from "classnames/bind";
import styles from "./CommentList.module.css";
import axios from "../../api/api";
import { useState } from "react";

function CreateBookComment ({ commentList, basicUrl, getCommentList }) {
    const cx = classNames.bind(styles);

    // CREATE
    const [isContent, setContent] = useState('');

    // const onSubmit = (e) => {
    //     if(e.key === 'Enter'){
    //         addComment();
    //     };
    // };
    
    const addComment = async () => {
        const url = `${basicUrl}`;
        const content = {
            content : `${isContent}`
        }
        try {
            const response = await axios({
                method: 'post',
                url,
                data : content
            });
        } catch (err) {
            console.log(err);
        };
        await getCommentList()
        setContent('');
    };

    return(
        <div className={cx('comment_plus')}>
            <input
                onChange={(e) => {
                    setContent(e.target.value);
                }}
                value={isContent}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        if (e.nativeEvent.isComposing === false) {
                            addComment();
                        }
                    }
                }}
                type={'text'}
                placeholder={'댓글 작성하기'}
                maxLength={'40'}
            ></input>
            <button onClick={addComment}>작성</button>
        </div>
    )
}

export default CreateBookComment;