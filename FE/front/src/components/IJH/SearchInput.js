import React, { useEffect, useState } from 'react';
import styles from '././';

const wholeTextArray = [
	'apple',
	'banana',
	'coding',
	'javascript',
	'원티드',
	'프리온보딩',
	'프론트엔드',
];

const SearchInput = () => {
	const [inputValue, setInputValue] = useState('');
	const [isHaveInputValue, setIsHaveInputValue] = useState(false);
	const [dropDownList, setDropDownList] = useState(wholeTextArray);
	const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

	const showDropDownList = () => {
		if (inputValue === '') {
			setIsHaveInputValue(false);
			setDropDownList([]);
		} else {
			const choosenTextList = wholeTextArray.filter((textItem) =>
				textItem.includes(inputValue),
			);
			setDropDownList(choosenTextList);
		}
	};

	const changeInputValue = (event) => {
		setInputValue(event.target.value);
		setIsHaveInputValue(true);
	};

	const clickDropDownItem = (clickedItem) => {
		setInputValue(clickedItem);
		setIsHaveInputValue(false);
	};

	const handleDropDownKey = (event) => {
		//input에 값이 있을때만 작동
		if (isHaveInputValue) {
			if (
				event.key === 'ArrowDown' &&
				dropDownList.length - 1 > dropDownItemIndex
			) {
				setDropDownItemIndex(dropDownItemIndex + 1);
			}

			if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
				setDropDownItemIndex(dropDownItemIndex - 1);
			if (event.key === 'Enter' && dropDownItemIndex >= 0) {
				clickDropDownItem(dropDownList[dropDownItemIndex]);
				setDropDownItemIndex(-1);
			}
		}
	};

	useEffect(showDropDownList, [inputValue]);

	return (
		<div>
			<div className=''></div>
		</div>
	);
};

export default SearchInput;
