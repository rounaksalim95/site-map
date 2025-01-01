import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import BlogsPage from './components/Blog/BlogsPage';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <ThemeToggle />
          <Routes>
            <Route path="/" element={
              <div className="landing-page">
                <header className="App-header">
                  <div className="bouncing-R">R</div>
                  <nav className="nav-links">
                    <Link to="/blogs" className="blog-link">Read My Blogs</Link>
                  </nav>
                </header>
              </div>
            } />
            <Route path="/blogs" element={<BlogsPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;