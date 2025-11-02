import React, { useState } from 'react';
import Book from './Book.jsx';
import Modal from './Modal.jsx';
import BookDetails from './BookDetails.jsx';
import LoanManagement from './LoanManagement.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleSelectBook(id) {
    setSelectedBook(prev => (prev === id ? null : id));
  }

  function addBook(bookData) {
    const newBook = {
      id: Date.now().toString(),
      title: bookData.title,
      author: bookData.author,
      price: '$0.00',
      image: bookData.image,
      url: '#'
    };

    setBooks(prevBooks => [...prevBooks, newBook]);
  }

  function deleteBook() {
    if (selectedBook) {
      setBooks(prevBooks => prevBooks.filter(book => book.id !== selectedBook));
      setSelectedBook(null);
    }
  }

  function editBook() {
    if (selectedBook) {
      const bookToEdit = books.find(book => book.id === selectedBook);
      if (bookToEdit) {
        const newTitle = prompt('Enter new title:', bookToEdit.title);
        const newAuthor = prompt('Enter new author:', bookToEdit.author);
        if (newTitle !== null && newAuthor !== null) {
          setBooks(prevBooks =>
            prevBooks.map(book =>
              book.id === selectedBook
                ? { ...book, title: newTitle, author: newAuthor }
                : book
            )
          );
        }
      }
    }
  }


  const [filter, setFilter] = useState('');
  const categories = [...new Set(books.map(book => book.author))];

  if (currentPage === 'loan') {
    return (
      <div className="App">
        <LoanManagement onBack={() => setCurrentPage('main')} />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Book Catalog</h1>
        <button className="loan-button" onClick={() => setCurrentPage('loan')}>Manage your Book Loans</button>
      </div>
      <div className="filter">
      <span className="filter-title">Filter by Author</span>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All Authors</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      </div>
      <div className="main-row">
        <div className="add-button-container">
        <button
          className="addbutton"
          onClick={openModal}
        >
          Add Book +
        </button>
        <div className="actions">
          <button onClick={deleteBook} className="delete">Delete</button>
          <button onClick={editBook} className="edit">Edit</button>
        </div>
        </div>
        <div className="book-list">
          {books.filter(book => !filter || book.author === filter).map((book) => (
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              image={book.image}
              url={book.url}
              selected={selectedBook === book.id}
              onSelect={() => handleSelectBook(book.id)}
            />
          ))}
        </div>
      </div>

      {showModal && <Modal onClose={closeModal} onAddBook={addBook} />}
      <div className="footer">
        <p>© Darrel James Soriano, 2025</p>
      </div>
    </div>
  );
}

export default App;
