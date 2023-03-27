import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import bookSearchList from '../../pages/HJ/atom';
import axios from '../../api/api';

import style from './Search.module.css';

const HomeSearch = function () {

  const params = useLocation();
  const urlSearch = params.search;
  const [currentQuery, setCurrentQuery] = useState(new URLSearchParams(urlSearch).get('q'));

  const [bookData, setBookdata] = useRecoilState(bookSearchList);

  const searchBook = async () => {
      const url = `/books/search?keyword=${currentQuery}`;
      try {
          const res = await axios.get(url);
          const books = res.data;
          setBookdata(books);
      } catch (error) {
          console.log(error);
      }
  }
  console.log(bookData)
  useEffect(() => {
      setCurrentQuery(currentQuery);
  }, [currentQuery, params])

  const navigate = useNavigate()

	const handleSearch = (event) => {
		if (event.key === 'Enter') {
		navigate(`/search?q=${currentQuery}`);
      searchBook();
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
