import style from './Footer.module.css';

const Footer = function () {
	return (
		<>
			<div className={style.footerBox}>
				<div className={style.footerBox2}>
					{/*<img src={izonelogo} className='izonelogo' alt={izonelogo} />*/}
					<h2 className={style.footerlogo}>LOGO</h2>
					<div className={style.footerText}>
						<h2>아이즈원</h2>
						<p className={style.text}>© 2023 · All Rights Reserved</p>
						<p className={style.text}>
							팀 : 아이즈원 · 팀장 : 조수빈 · 부팀장 : 안병옥
						</p>
						<p className={style.text}>백엔드 : 안병옥 박의진 김미진 이혜인</p>
						<p className={style.text}>프론트엔드 : 조수빈 임지현 김현지</p>
						<p>
							깃허브 주소 :
							<a
								className={style.a}
								href='https://github.com/codestates-seb/seb42_main_019'
							>
								https://github.com/codestates-seb/seb42_main_019
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
