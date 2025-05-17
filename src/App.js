import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Favorites from './pages/Favorites';
import { ThemeProvider } from './contexts/ThemeContext';
import { BookProvider } from './contexts/BookContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BookProvider>
        <Router basename="/book-me-up">
          <div className="app">
            <Header />
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
            <footer className="footer">
              <p>© 2025 Book Me Up By Muhammad Usama</p>
            </footer>
          </div>
        </Router>
      </BookProvider>
    </ThemeProvider>
  );
}

export default App;