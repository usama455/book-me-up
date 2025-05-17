import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useBooks } from '../contexts/BookContext';

const GENRES = [
  'All',
  'Fiction',
  'Fantasy',
  'Romance',
  'Science Fiction',
  'Mystery',
  'Thriller',
  'History',
  'Biography',
  'Children',
];

const Home = () => {
  const {
    books,
    loading,
    error,
    currentPage,
    totalFound,
    nextPage,
    prevPage,
    setSearchQuery,
    isSearching
  } = useBooks();

  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Handle immediate UI feedback for search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [search]);

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const genreText = selectedGenre !== 'All' ? selectedGenre : '';
    const fullQuery = [debouncedSearch, genreText].filter(Boolean).join(' ');
    setSearchQuery(fullQuery || 'fiction');
  };

  // Apply local filtering based on selected genre
  useEffect(() => {
    if (selectedGenre === 'All') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(
        books.filter(
          (book) => book.genre?.toLowerCase().includes(selectedGenre.toLowerCase())
        )
      );
    }
  }, [books, selectedGenre]);

  return (
    <div className="home-page">
      <h1 className="page-title">Discover Your Next Great Read</h1>
      <p className="subtitle">Search thousands of books to find your new favorite</p>

      <form onSubmit={handleSubmit} className="search-bar">
        <div className="search-input-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="genre-select"
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            // Trigger search on genre change if there's already a search term
            if (debouncedSearch) {
              const genreText = e.target.value !== 'All' ? e.target.value : '';
              const fullQuery = [debouncedSearch, genreText].filter(Boolean).join(' ');
              setSearchQuery(fullQuery || 'fiction');
            }
          }}
        >
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <button type="submit" className="search-btn" disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <LoadingSpinner />
          <p>Finding amazing books for you...</p>
        </div>
      ) : (
        <>
          {filteredBooks.length > 0 ? (
            <>
              <div className="results-info">
                <p>
                  Showing {filteredBooks.length} books on page {currentPage} of Many 
                  {/* Total found: {totalFound} */}
                </p>
              </div>

              <div className="book-grid">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              {totalFound > 20 && (
                <div className="pagination-controls">
                  <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1 || isSearching} 
                    className="pagination-btn"
                  >
                    ⬅ Previous
                  </button>
                  <span className="page-indicator">Page {currentPage}</span>
                  <button 
                    onClick={nextPage} 
                    disabled={currentPage * 20 >= totalFound || isSearching}
                    className="pagination-btn"
                  >
                    Next ➡
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <h2>No books found</h2>
              <p>Try adjusting your search terms or selecting a different genre</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;