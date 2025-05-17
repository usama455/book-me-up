import React, { createContext, useState, useContext, useEffect } from 'react';
import { booksData } from '../data/books';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load books data
  useEffect(() => {
    // Simulate API loading
    const loadBooks = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For demo purposes, we're using the imported data
        setTimeout(() => {
          setBooks(booksData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error loading books:', error);
        setLoading(false);
      }
    };
    
    loadBooks();
  }, []);
  
  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('bookFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites:', error);
      }
    }
  }, []);
  
  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('bookFavorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // Toggle favorite status
  const toggleFavorite = (bookId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(bookId)) {
        return prevFavorites.filter(id => id !== bookId);
      } else {
        return [...prevFavorites, bookId];
      }
    });
  };
  
  // Check if book is favorite
  const isFavorite = (bookId) => {
    return favorites.includes(bookId);
  };
  
  // Get book by ID
  const getBookById = (id) => {
    return books.find(book => book.id === id);
  };
  
  // Get favorite books
  const getFavoriteBooks = () => {
    return books.filter(book => favorites.includes(book.id));
  };
  
  // Search books
  const searchBooks = (query, filters = {}) => {
    if (!query && Object.keys(filters).length === 0) {
      return books;
    }
    
    let filteredBooks = [...books];
    
    // Apply search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply genre filter
    if (filters.genre && filters.genre !== 'all') {
      filteredBooks = filteredBooks.filter(book => 
        book.genre === filters.genre
      );
    }
    
    // Apply rating filter
    if (filters.rating && filters.rating !== 'all') {
      filteredBooks = filteredBooks.filter(book => 
        book.rating >= parseInt(filters.rating)
      );
    }
    
    return filteredBooks;
  };
  
  // Get similar books
  const getSimilarBooks = (bookId, limit = 4) => {
    const book = getBookById(bookId);
    if (!book) return [];
    
    return books
      .filter(b => b.id !== bookId && b.genre === book.genre)
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);
  };
  
  // Get all available genres
  const getGenres = () => {
    const genres = new Set(books.map(book => book.genre));
    return ['all', ...Array.from(genres)];
  };
  
  return (
    <BookContext.Provider value={{
      books,
      loading,
      favorites,
      toggleFavorite,
      isFavorite,
      getBookById,
      getFavoriteBooks,
      searchBooks,
      getSimilarBooks,
      getGenres
    }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;