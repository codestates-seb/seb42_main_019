import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Pagenation.module.css'

function Pagenation({ pageInfo, currentPage, onPageChange }) {
    const { pageNumber, totalPages } = pageInfo;
    const cx = classNames.bind(styles);

    const handleClick = (page) => {
        onPageChange(page);
    };
    
    let pageNumbers = [];
    const pageRange = 2;
    
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - pageRange && i <= currentPage + pageRange)
        ) {
            pageNumbers.push(i);
        }
    }
    
    const pages = [];
    
    pageNumbers.forEach((page, index) => {
        if (index !== 0 && pageNumbers[index - 1] !== page - 1) {
            pages.push(-1);
        }
        pages.push(page);
    });
    
    return (
        <nav>
            <ul className={cx('nav')}>
                {pages.map((page, index) => (
                <li className={cx('li')} key={index}>
                    {page === -1 ? (
                    <span>...</span>
                    ) : (
                    <button
                        onClick={() => handleClick(page)}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                    )}
                </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagenation;
