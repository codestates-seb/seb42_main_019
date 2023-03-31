// /* eslint-disable react/jsx-pascal-case */
// import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from '../../api/api';

// import style from './MessageWrite.module.css'
// import classNames from 'classnames';

// import Header2 from '../../components/common/Header2';

// //1. 로그인한 사람 유저 본인만 접근 가능 ( )
// //2. 메세지 받는 사람의데이터 get 요청 ( )
// //   1. 메세지데이터의 받는 사람 데이터로 MessagesList1에 데이터 전달 ( )
// //3. textarea에 상태가 바뀐 formData를 post 요청보내야 함. ( )

// //? 맨 처음 메세지를 시작할 때는 어떻게 받는 사람 정보를 가져오지?

// function MessageWrite() {
//     const cx = classNames.bind(style)
//     const params = useParams();
    
    

//     return (
//         <div>
//             <Header2>메세지 보내기 </Header2>

//         </div>
//         );
//     }
    
//     export default MessageWrite;



import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/api';

import style from './MessageWrite.module.css'
import classNames from 'classnames';

import Header2 from '../../components/common/Header2';

function MessageWrite() {
    const cx = classNames.bind(style)
    const params = useParams();
    const receiverId = params.id
    const history = useNavigate();
    const [formData, setFormData] = useState({
        receiverId: params.id,
        content: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/messages/${receiverId}`, formData);
            console.log('Message sent successfully!');
            history.push('/myPage/receivedMessages');
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <div>
            <Header2>메세지 전송</Header2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className={cx('textarea')}
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
                <button className={cx('sendBtn')} type="submit">메세지 보내기</button>
            </form>
        </div>
    );
}

export default MessageWrite;
