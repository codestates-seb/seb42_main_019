import style from './Search.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSearch = function ( { currentQuery, setCurrentQuery, searchBook } ) {

	// const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

	const handleSearch = (event) => {
		if (event.key === 'Enter') {
		  navigate(`/search?q=${currentQuery}`);
      searchBook()
		}
	}

  return (
    <>
      <div className={style.notFooter}>
        <input
          className={style.listboxMessage}
          type="text"
          placeholder="지금 당신이 읽고 싶은 책은 바로!..."
          onChange={(e)=>
            {
              setCurrentQuery(e.target.value)
              e.preventDefault();
            }
          }
		      onKeyUp={handleSearch}
        />
      </div>
    </>
  );
};

export default HomeSearch;
