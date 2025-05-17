import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';

const BookCard = ({ book }) => {
  const { toggleFavorite, isFavorite } = useBooks();
  const favorite = isFavorite(book.id);
  
  // Truncate description to 100 characters
  const truncatedDescription = book.description.length > 100 
    ? `${book.description.substring(0, 100)}...` 
    : book.description;
  
  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`}>
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`} 
          className="book-cover"
        />
      </Link>
      
      <div className="book-info">
        <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="book-title">{book.title}</h3>
        </Link>
        <p className="book-author">by {book.author}</p>
        <p className="book-description">{truncatedDescription}</p>
        
        <div className="book-meta">
          <div className="book-rating">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {book.rating.toFixed(1)}
          </div>
          
          <button 
            className="favorite-btn" 
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(book.id);
            }}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill={favorite ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;