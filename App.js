import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showIssuedOnly, setShowIssuedOnly] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleIssue = (id) => {
    axios.put(`http://localhost:5000/books/${id}/issue`)
      .then(res => {
        const updatedBooks = books.map(book =>
          book.id === id ? { ...book, issued: true } : book
        );
        setBooks(updatedBooks);
      })
      .catch(err => console.error(err));
  };

  const handleReturn = (id) => {
    axios.put(`http://localhost:5000/books/${id}/return`)
      .then(res => {
        const updatedBooks = books.map(book =>
          book.id === id ? { ...book, issued: false } : book
        );
        setBooks(updatedBooks);
      })
      .catch(err => console.error(err));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredBooks = books.filter(book => {
    const matchCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchIssued = !showIssuedOnly || book.issued;
    return matchCategory && matchIssued;
  });

  return (
    <div className="container py-5">
      <h1 className="text-center text-white mb-4">📚 Mini Library App</h1>

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex flex-wrap gap-3">
          <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All Categories</option>
            <option value="Thiller">Thiller</option>
            <option value="Comedy">Comedy</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Kids">Kids</option>
            <option value="Romance">Romance</option>
          </select>

          <button
            className={`btn ${showIssuedOnly ? 'btn-warning' : 'btn-outline-light'}`}
            onClick={() => setShowIssuedOnly(prev => !prev)}
          >
            {showIssuedOnly ? 'Showing Issued Only' : 'Show Issued Only'}
          </button>
        </div>

        <p className="text-white mb-0">Total: {filteredBooks.length}</p>
      </div>

      <div className="row">
        {filteredBooks.map((book, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className={`card h-100 ${book.issued ? 'border-danger' : 'border-success'}`}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <p className="card-text mb-1">Category: {book.category}</p>
                <p className="card-text mb-3">Status: {book.issued ? 'Issued' : 'Available'}</p>
                {book.issued ? (
                  <button className="btn btn-success mt-auto" onClick={() => handleReturn(book.id)}>Return</button>
                ) : (
                  <button className="btn btn-primary mt-auto" onClick={() => handleIssue(book.id)}>Issue</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
