// src/components/Quotes.js
import React, { useState, useEffect } from "react";
import "./Quotes.css"; // Import the CSS file for styling

function Quotes() {
    const [quotes, setQuotes] = useState([]);
    const [newQuote, setNewQuote] = useState("");

    useEffect(() => {
        const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
        setQuotes(storedQuotes);
    }, []);

    const addQuote = () => {
        const updatedQuotes = [...quotes, { id: Date.now(), text: newQuote }];
        setQuotes(updatedQuotes);
        localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
        setNewQuote("");
    };

    const deleteQuote = (id) => {
        const updatedQuotes = quotes.filter((quote) => quote.id !== id);
        setQuotes(updatedQuotes);
        localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
    };

    return (
        <div className="quotes-container">
            <h2>Quotes</h2>
            <div className="input-button-container">
                <input
                    type="text"
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    placeholder="Enter a new quote"
                />
                <button onClick={addQuote}>Add Quote</button>
            </div>

            <table className="quotes-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Quote</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map((quote, index) => (
                        <tr key={quote.id}>
                            <td>{index + 1}</td>
                            <td>{quote.text}</td>
                            <td>
                                <button onClick={() => deleteQuote(quote.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Quotes;