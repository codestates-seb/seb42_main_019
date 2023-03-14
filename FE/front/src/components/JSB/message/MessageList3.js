import style from './MessageList3.module.css';
import data from '../../../dummyData/SB/messageContent1'
import classNames from 'classnames/bind';

function MessageList3() {
	
	const cx = classNames.bind(style);
	  


	return (
		<>
			{data.map((el)=>{
                return(
                    <>
                    <button className={cx('messageBtn')}>
				<div className={cx('notFooter')}>
					<div className={cx('listboxMessage')}>
						<div className={cx('profileContent')}>
							<div key={el.id} className={cx('profileName')}>{el.name}</div>
							<div className={cx('message')}>
								{el.content}
							</div>
						</div>
                        <span className={cx('messageDate')}>{el.date}</span>
					</div>
				</div>
			</button>
                    </>
                )
            })}
            
		</>
	);
}

export default MessageList3;
