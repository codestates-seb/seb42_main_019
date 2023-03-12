import style from './Footer.module.css';
{
	/*import izonelogo from '../../assets/izonelogo3.png';*/
}

const Footer = function () {
	return (
		<>
			<div className={style.footerBox}>
				<div className={style.footerBox2}>
					{/*<img src={izonelogo} className='izonelogo' alt={izonelogo} />*/}
					<h2>LOGO</h2>
					<div className={style.footerText}>
						<h2>아이즈원</h2>
						<p>© 2023 · All Rights Reserved</p>
						<p>팀 : 아이즈원 · 팀장 : 조수빈 · 부팀장 : 안병옥</p>
						<p>백엔드 : 안병옥 박의진 김미진 이혜인</p>
						<p>프론트엔드 : 조수빈 임지현 김현지</p>
						<p>
							깃허브 주소 : https://github.com/codestates-seb/seb42_main_019
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
