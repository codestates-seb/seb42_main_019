import { useState } from 'react';
import style from './MessageList3.module.css';
import data from '../../../dummyData/SB/messageContent1'
import classNames from 'classnames/bind';

function MessageList3() {

    const cx = classNames.bind(style);
    let [btnActive, setBtnActive] = useState("");

    const toggleActive = (e) =>{
        setBtnActive((prev)=>{
            return e.target.value;
        });
    };

	return (
		<>
			{data.map((el)=>{
                return(
                    <>
                    <button className={cx('messageBtn')} onClick={toggleActive}>
				<div className={cx('notFooter')}>
					<div className={cx('listboxMessage')}>
						<div className={cx('profileContent')}>
							<div key={el.id} className={cx('profileName','notprofileName')}>{el.name}</div>
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
