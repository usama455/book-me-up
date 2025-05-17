import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const BookContext = createContext();
export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('fiction');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFound, setTotalFound] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  // Memoized fetch function to avoid recreating on every render
  const fetchBooks = useCallback(async (query, page) => {
    setIsSearching(true);
    setError(null);
    
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=20`
      );
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      
      const formattedBooks = data.docs.map(book => ({
        id: book.key?.replace('/works/', '') || book.edition_key?.[0] || Math.random().toString(36).substring(2, 9),
        title: book.title || 'Untitled',
        author: book.author_name?.[0] || 'Unknown Author',
        genre: book.subject?.[0] || 'Uncategorized',
        publicationYear: book.first_publish_year,
        rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
        coverImage: book.cover_i 
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` 
          : null,
        description: book.first_sentence?.[0] || 'No description available.'
      }));
      
      setBooks(formattedBooks);
      setTotalFound(data.numFound || 0);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again later.');
      setBooks([]);
      setTotalFound(0);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, []);

  // Debounced search to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks(searchQuery, currentPage);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, currentPage, fetchBooks]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    setLoading(true);
    const storedFavorites = localStorage.getItem('bookFavorites');
    
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites:', error);
        localStorage.removeItem('bookFavorites');
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const isFavorite = (bookId) => favorites.includes(bookId);
  
  const getBookById = (id) => books.find((book) => book.id === id);
  
  const getFavoriteBooks = () => books.filter((book) => favorites.includes(book.id));

  const nextPage = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => prev + 1);
  };
  
  const prevPage = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const setSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        error,
        favorites,
        totalFound,
        currentPage,
        isSearching,
        toggleFavorite,
        isFavorite,
        getBookById,
        getFavoriteBooks,
        nextPage,
        prevPage,
        setSearchQuery: setSearch
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;