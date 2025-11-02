// Example parent component
import React, { useState } from 'react';
import Book from './Book';

function BookList({ books }) {
  const [bookList, setBookList] = useState(books);

  function removeBook(id) {
    setBookList(bookList.filter(book => book.id !== id));
  }

  return (
    <div>
      {bookList.map(book => (
        <Book
          key={book.id}
          {...book}
          onRemove={() => removeBook(book.id)}
        />
      ))}
    </div>
  );
}

export default BookList;