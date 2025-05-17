import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useBooks } from '../contexts/BookContext';

const Home = () => {
  const { books, loading, searchBooks, getGenres } = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genre, setGenre] = useState('all');
  const [rating, setRating] = useState('all');
  const genres = getGenres();
  
  // Apply filters whenever search inputs change
  useEffect(() => {
    const applySearch = () => {
      const filters = {
        genre,
        rating
      };
      
      const results = searchBooks(searchQuery, filters);
      setFilteredBooks(results);
    };
    
    applySearch();
  }, [searchQuery, genre, rating, books, searchBooks]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    // The search is already applied via useEffect
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="home-page">
      <h1>Discover Your Next Read</h1>
      
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ marginRight: '8px' }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search
          </button>
        </form>
        
        <div className="filters">
          <select 
            className="filter-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {genres.map(g => (
              <option key={g} value={g}>
                {g === 'all' ? 'All Genres' : g}
              </option>
            ))}
          </select>
          
          <select 
            className="filter-select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="all">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>
      </div>
      
      {filteredBooks.length > 0 ? (
        <>
          <div className="results-info">
            <p>Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}</p>
          </div>
          
          <div className="book-grid">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <h2>No books found</h2>
          <p>Try adjusting your search or filters</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSearchQuery('');
              setGenre('all');
              setRating('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
