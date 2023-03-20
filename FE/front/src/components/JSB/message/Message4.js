import classNames from 'classnames';
import messageContent1 from '../../../dummyData/SB/messageContent1';
import style from './MessageList3.module.css';
import { useParams } from 'react-router-dom';

const Profile = () =>{
    const cx = classNames.bind(style)
    const params = useParams();
    const profile = messageContent1[params.id];
    
    return(
        <div>
            <button className={cx('messageBtn')}>
				<div className={cx('notFooter')}>
					<div className={cx('listboxMessage')}>
						<div className={cx('profileContent')}>
							<div key={profile.id} className={cx('profileName')}>{profile.name}</div>
							<div className={cx('message')}>
								{profile.content}
							</div>
						</div>
                        <span className={cx('messageDate')}>{profile.date}</span>
					</div>
				</div>
			</button>
        </div>
    )
}

export default Profile;