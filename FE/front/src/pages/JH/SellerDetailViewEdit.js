import React from 'react';
import styles from './CustomerDetailView.module.css';
import Header2 from '../../components/common/Header2';
import Button from '../../components/common/Button';

const SellerDetailViewEdit = () => {
	return (
		<div>
			<div className={styles.Main}>
				<Header2>등록된 책</Header2>
				<div className={styles.Text}>
					<label>책 설명</label>
					<div className={styles.TextIner}>
						또 읽으려고 가지고 있었는데, 다른책이 더 읽고 싶어졌어요.
					</div>
				</div>
				<div className={styles.BookState}>
					<label>책 상태</label>
					<div className={styles.State}>상</div>
				</div>
				<Button>수정하기</Button>
			</div>
		</div>
	);
};

export default SellerDetailViewEdit;
