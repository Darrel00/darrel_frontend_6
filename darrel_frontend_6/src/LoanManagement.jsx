import { useState } from 'react';

export default function LoanManagement({ onBack, onLoanBook, loanedBooks = [], availableBooks = [] }) {
    const [loanData, setLoanData] = useState({
        bookTitle: '',
        borrowerName: '',
        loanWeeks: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onLoanBook) {
            onLoanBook(loanData);
        }
        setLoanData({
            bookTitle: '',
            borrowerName: '',
            loanWeeks: ''
        });
    };

    return (
        <div className="loan-management">
            <div className="header">
            <h1>Book Loan Management</h1>
            </div>
            <h2 className='add-new-loan'>Add a New Loan <button onClick={onBack} className="back-button">Back to Main</button></h2>
            {availableBooks.length > 0 ? (
                <form onSubmit={handleSubmit} className="filter">
                    <div className="form-group">
                        <label htmlFor="bookTitle">Book Title:</label>
                        <input
                            type="text"
                            id="bookTitle"
                            name="bookTitle"
                            value={loanData.bookTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="borrowerName">Borrower Name:</label>
                        <input
                            type="text"
                            id="borrowerName"
                            name="borrowerName"
                            value={loanData.borrowerName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loanWeeks">Loan Duration (weeks):</label>
                        <input
                            type="number"
                            id="loanWeeks"
                            name="loanWeeks"
                            value={loanData.loanWeeks}
                            onChange={handleChange}
                            required
                            min="1"
                        />
                    </div>
                    <button type="submit" className="submit-button">Submit Loan</button>
                </form>
            ) : (
                <p className='no-loans'>There are no available books to borrow.</p>
            )}
            <h2 className='add-new-loan'>Currently on Loan:</h2>
            {loanedBooks.length > 0 ? (
                <div className="filter">
                    {loanedBooks.map(book => (
                        <div key={book.id} className="loaned-book-item">
                            <h3>{book.title}</h3>
                            <p>Borrower: {book.borrower}</p>
                            <p>Loan Duration: {book.loanWeeks} weeks</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='no-loans'>No books currently on loan.</p>
            )}
        </div>
    );
}