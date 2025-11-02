import { useState } from 'react';
import 

export default function LoanManagement({ onBack }) {
    const [loanData, setLoanData] = useState({
        bookTitle: '',
        borrowerName: '',
        loanDate: '',
        returnDate: ''
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
        // Handle form submission logic here
        console.log('Loan data submitted:', loanData);
        // Reset form after submission
        setLoanData({
            bookTitle: '',
            borrowerName: '',
            loanDate: '',
            returnDate: ''
        });
    };

    return (
        <div className="loan-management">
            <h1>Book Loan Management</h1>
            <form onSubmit={handleSubmit} className="loan-form">
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
                    <label htmlFor="loanDate">Loan Date:</label>
                    <input
                        type="date"
                        id="loanDate"
                        name="loanDate"
                        value={loanData.loanDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="returnDate">Return Date:</label>
                    <input
                        type="date"
                        id="returnDate"
                        name="returnDate"
                        value={loanData.returnDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Submit Loan</button>
            </form>
            <button onClick={onBack} className="back-button">Back to Main</button>
        </div>
    );
}