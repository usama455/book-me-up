import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';

const BookCard = ({ book }) => {
  const { toggleFavorite, isFavorite } = useBooks();
  const favorited = isFavorite(book.id);

  // Generate rating stars
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`half-star-${book.id}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="none" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path fill={`url(#half-star-${book.id})`} d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
        </svg>
      );
    }
    
    // Add empty stars to complete 5 stars
    const emptyStarsCount = 5 - stars.length;
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="star" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" opacity="0.5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    }
    
    return stars;
  };

  // Placeholder image for books without cover
  const placeholderCover = (
    <div className="placeholder-cover">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      <div className="placeholder-title">{book.title?.substring(0, 25)}</div>
    </div>
  );

  return (
    <div className="book-card">
      {book.coverImage ? (
        <img 
          src={book.coverImage} 
          alt={`Cover of ${book.title}`} 
          className="book-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.parentNode.replaceChild(
              document.createRange().createContextualFragment(placeholderCover.outerHTML), 
              e.target
            );
          }} 
        />
      ) : placeholderCover}
      
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        
        <div className="book-rating">
          <div className="rating-stars">
            {renderRatingStars(book.rating)}
          </div>
          <span className="rating-value">{book.rating}</span>
        </div>
        
        {book.publicationYear && (
          <div className="book-year">Published in {book.publicationYear}</div>
        )}
        
        {book.genre && <span className="book-genre">{book.genre}</span>}
        
        <div className="book-actions">
          <button 
            className={`favorite-btn ${favorited ? 'active' : ''}`}
            onClick={() => toggleFavorite(book.id)} 
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            {favorited ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-5.201-3.893 10.989 10.989 0 01-2.751-7.43c0-3.839 2.478-6.773 6.07-6.773 1.647 0 3.39.723 4.266 2.029.876-1.306 2.62-2.029 4.266-2.029 3.592 0 6.07 2.934 6.07 6.773 0 2.572-1.061 5.042-2.75 7.43a15.247 15.247 0 01-5.201 3.893l-.022.012-.007.003-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
          
          <Link to={`/book/${book.id}`} className="details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;