import { useNavigate } from 'react-router-dom';
import style from './Search.module.css';

<<<<<<< HEAD
const HomeSearch = function ({ currentQuery, setCurrentQuery, searchBook }) {
=======
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
  useEffect(() => {
      setCurrentQuery(currentQuery);
  }, [currentQuery, params])
>>>>>>> feat/FE

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
