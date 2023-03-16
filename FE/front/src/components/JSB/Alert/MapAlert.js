
import style from './AlertListMs.module.css';
import messageContent from '../../../dummyData/SB/messageContent1'
import classNames from 'classnames/bind';

const MapAlert = function () {
    const cx = classNames.bind(style)

	return (
		<>
            {messageContent.map((el)=>{
                return(
                    <>
                    <div className={cx('box1')}>
                    <div className={cx('notFooter')}>
                        <div className={cx('listboxMessage')}>
                        <img className={cx('alertprofileimg')} src={el.profileImg} alt={el.name}/>
                            <div className={cx('alertMessage1')}>
                            <p className={cx('alertTitle')}>⚡️ 메세지 알림</p>
                                <p className={cx('alertMessage01')}>
                                    {el.name}님에게 메세지가 도착했습니다.
                                </p>
                            </div>
                            <div className={cx('alertTextBox')}>
                                <p className={cx('alertDateText')}>{el.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
                    </>
                )
            })}
		</>
	);
};

export default MapAlert;
