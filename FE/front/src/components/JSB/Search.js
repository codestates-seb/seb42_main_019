import { useNavigate } from 'react-router-dom';
import style from './Search.module.css';

const HomeSearch = function () {

  const navigate = useNavigate()

	const handleSearch = (event) => {
		if (event.key === 'Enter') {
		  navigate(`/search?q=${event.target.value}`);
		}
	}

  return (
    <>
      <div className={style.notFooter}>
        <input
          className={style.listboxMessage}
          type="text"
          placeholder="지금 당신이 읽고 싶은 책은 바로!..."
          onChange={(e) => {e.preventDefault();}}
		      onKeyUp={handleSearch}
        />
      </div>
    </>
  );
};

export default HomeSearch;
