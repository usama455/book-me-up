import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { useBooks } from '../contexts/BookContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Favorites = () => {
  const { getFavoriteBooks, loading } = useBooks();
  const favoriteBooks = getFavoriteBooks();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="favorites-page">
      <h1>Your Favorite Books</h1>
      
      {favoriteBooks.length > 0 ? (
        <div className="book-grid">
          {favoriteBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
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
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <h2>No Favorites Yet</h2>
          <p>Start adding books to your favorites</p>
          <Link to="/" className="btn btn-primary">
            Discover Books
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;