import style from './Search.module.css';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import book from '../../dummyData/SB/bookDetailData';

const HomeSearch = function () {

  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get('keyword');
  const [keyword, setKeyword] = useState(initKeyword || '');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchParams(keyword ? { keyword } : {});
    }
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleFilterBooks = () => {
    return book.filter(book => book.title.includes(keyword));
  };

  return (
    <>
      <div className={style.notFooter}>
        <input
          className={style.listboxMessage}
          type="text"
          placeholder="지금 당신이 읽고 싶은 책은 바로!..."
          onChange={handleKeywordChange}
          onKeyDown={handleSearch}
          value={keyword}
        />
      </div>
      {handleFilterBooks().map(book => (
        <div key={book.id}>
          <p>{book.title}</p>
        </div>
      ))}
    </>
  );
};

export default HomeSearch;

