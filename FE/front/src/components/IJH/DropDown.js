import React, { useEffect, useState } from 'react';
import styles from '../../pages/JH/SignUp.module.css';

const DropDown = (props) => {
	const [visibilityAnimation, setVisibilityAnimation] = useState(false);

	useEffect(() => {
		if (props.visibility) {
			setVisibilityAnimation(true);
		} else {
			setTimeout(() => {
				setVisibilityAnimation(false);
			}, 400);
		}
	}, [props.visibility]);

	return (
		<article
			className={`${styles['components-dropdown']} ${
				props.visibility
					? `${styles['slide-fade-in-dropdown']}`
					: `${styles['slide-fade-out-dropdown']}`
			}`}
		>
			{visibilityAnimation && props.children}
		</article>
	);
};

export default DropDown;
