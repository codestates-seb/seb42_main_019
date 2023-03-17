
// SearchResults component
import BookList from '../common/BookList';
import bookdata from '../../dummyData/SB/bookData';
import { useLocation } from 'react-router-dom';

const SearchResults = function () {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');
  const filteredData = bookdata.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1>Search Results for "{searchQuery}"</h1>
      <BookList books={filteredData} />
    </>
  );
};

export default SearchResults;
