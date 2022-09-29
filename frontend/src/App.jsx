import React, { useState, useEffect } from 'react';
import './App.css';
import AddBook from './components/AddBook';
import Books from './components/Books';

function App() {
  const [books, setBooks] = useState([]);
  const getBooksFromNode = () => {
    fetch('http://localhost:3001/books')
      .then(res => res.json())
      .then(data => {
        console.log('data books:', data);
        setBooks(data);
      });
  }

  // Component Init
  useEffect(() => {
    getBooksFromNode();
  }, [])

  return (
    <div className='react-app-component text-center'>
      <h3 className='my-4'>Reading tracker</h3>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Add Book to Reading List
            </button>
          </div>
        </div>
        <Books books={books}></Books>
        <AddBook></AddBook>
      </div>
    </div>
  );
}

export default App;