import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/api';

import style from './MessageWrite.module.css'
import classNames from 'classnames/bind';

import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';

function MessageWrite() {
    const cx = classNames.bind(style)
    const params = useParams();
    const receiverId = params.id
    const history = useNavigate();
    const [formData, setFormData] = useState({
        receiverId: receiverId,
        content: ''
    });
    
    const [profile, setProfile] = useState(null);
    
    useEffect(()=>{
        const getProfile = async()=>{
            try{
                const response = await axios.get(`/messages/received/?pageNumber=1&size=10&sort=create_date_time,DESC`);
                const profileData = response.data.data[receiverId];
                setProfile(profileData);
            }catch (error){
                console.error('Error getting profile', error);
            }
        };
        getProfile();
    }, []);
    
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/messages/${profile.sender.userId}`, formData);
            console.log('Message sent successfully!');
            history('/myPage/receivedMessageBox');
        } catch (error) {
            console.error('Error sending message', error);
        }
    };
    console.log(profile)
    return (
        <div>
            <Header2>메세지 전송</Header2>
            <div className={cx('messageBoxV')}>
            <p className={cx('mvtext')}>메세지 쓰기</p>
                <div className={cx('viewContents')}>
                <div className={cx('viewContents2')}>
                <textarea className={cx('messageSubmit')}
                    name="content"
                    placeholder='여기 메세지를 입력해주세요'
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
                </div>
                </div>
            </div>
                <div className={cx('submitBtn')} type="submit" onClick={handleSubmit}>
                <Button >메세지 보내기</Button>
                </div>

        </div>
    );
}

export default MessageWrite;
