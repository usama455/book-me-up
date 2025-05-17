import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useBooks } from '../contexts/BookContext';

const BookDetails = () => {
  const { id } = useParams();
  const { getBookById, getSimilarBooks, loading, toggleFavorite, isFavorite } = useBooks();
  
  const book = getBookById(id);
  const similarBooks = getSimilarBooks(id);
  const favorite = book ? isFavorite(book.id) : false;
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!book) {
    return (
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h2>Book Not Found</h2>
        <p>We couldn't find the book you're looking for.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="book-details-page">
      <Link to="/" className="btn btn-secondary" style={{ marginBottom: '20px', display: 'inline-flex' }}>
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
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Books
      </Link>
      
      <div className="book-details">
        <div className="book-details-cover-container">
          <img 
            src={book.coverImage} 
            alt={`${book.title} cover`} 
            className="book-details-cover"
          />
          
          <button 
            className="btn btn-primary"
            style={{ 
              width: '100%', 
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => toggleFavorite(book.id)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill={favorite ? "white" : "none"} 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
        
        <div className="book-details-info">
          <h1>{book.title}</h1>
          <p className="book-details-author">by {book.author}</p>
          
          <div className="book-details-meta">
            <div className="meta-item">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              {book.pages} pages
            </div>
            
            <div className="meta-item">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              {book.genre}
            </div>
            
            <div className="meta-item">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {book.rating.toFixed(1)} rating
            </div>
            
            <div className="meta-item">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {book.year}
            </div>
          </div>
          
          <div className="book-details-description">
            <p>{book.description}</p>
          </div>
          
          {book.highlights && (
            <div className="book-highlights">
              <h3>Highlights</h3>
              <ul>
                {book.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="similar-books">
        <h2>Similar Books</h2>
        {similarBooks.length > 0 ? (
          <div className="book-grid">
            {similarBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p>No similar books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;