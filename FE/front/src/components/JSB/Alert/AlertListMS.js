import style from './AlertListMs.module.css';
import alertprofileImg from '../../../assets/izonelogo1.jpg'
import messageContent from '../../../dummyData/SB/messageContent1'
import classNames from 'classnames/bind';

const AlertListMS = function () {
	const cx = classNames.bind(style)

	return (
		<>
			<div className={cx('box1')}>
				<div className={cx('notFooter')}>
					<div className={cx('listboxMessage')}>
					<img className={cx('alertprofileimg')} src={alertprofileImg} alt='profileImg'/>
						<div className={cx('alertMessage1')}>
						<p className={cx('alertTitle')}>메세지 알림</p>
							<p className={cx('alertMessage01')}>
								{messageContent[2].name2}님에게 메세지가 도착했습니다.
							</p>
						</div>
						<div className={cx('alertTextBox')}>
							<p className={cx('alertDateText')}>{messageContent[1].date}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AlertListMS;
