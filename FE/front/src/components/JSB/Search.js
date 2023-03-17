import style from './Search.module.css';
import { useState } from 'react';

const HomeSearch = function () {

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (event) => {
		if (event.key === 'Enter') {
		  window.location.href = `/search?q=${searchQuery}`;
		}
	  }
	  
	

  return (
    <>
      <div className={style.notFooter}>
        <input
          className={style.listboxMessage}
          type="text"
          placeholder="지금 당신이 읽고 싶은 책은 바로!..."
          onChange={(e)=>setSearchQuery(e.target.value)}
		  onKeyDown={handleSearch}
		  value={searchQuery}
        />
      </div>
    </>
  );
};

export default HomeSearch;
