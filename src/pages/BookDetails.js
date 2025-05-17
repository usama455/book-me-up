import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useBooks } from '../contexts/BookContext';

const BookDetails = () => {
  const { id } = useParams();
  const { getBookById, loading, toggleFavorite, isFavorite, books } = useBooks();

  const book = getBookById(id);
  const favorite = book ? isFavorite(book.id) : false;
  
  // Get similar books based on genre
  const getSimilarBooks = () => {
    if (!book) return [];
    return books
      .filter(b => b.id !== book.id && b.genre === book.genre)
      .slice(0, 4);
  };
  
  const similarBooks = getSimilarBooks();

  if (loading) return <LoadingSpinner />;

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
            src={book.coverImage || '/api/placeholder/200/300?text=No+Cover'}
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
              gap: '8px',
            }}
            onClick={() => toggleFavorite(book.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={favorite ? 'white' : 'none'}
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
          <p className="book-details-author">by {book.author || 'Unknown Author'}</p>

          <div className="book-details-meta">
            <div className="meta-item">
              📚 {book.genre}
            </div>
            {book.rating !== undefined && (
              <div className="meta-item">
                ⭐ {book.rating?.toFixed(1)} rating
              </div>
            )}
            {book.publicationYear && (
              <div className="meta-item">
                🗓️ {book.publicationYear}
              </div>
            )}
          </div>

          <div className="book-details-description">
            <h3>Description</h3>
            <p>{book.description || 'No description available.'}</p>
          </div>
        </div>
      </div>

      <div className="similar-books">
        <h2>Similar Books</h2>
        {similarBooks.length > 0 ? (
          <div className="book-grid">
            {similarBooks.map(similar => (
              <BookCard key={similar.id} book={similar} />
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