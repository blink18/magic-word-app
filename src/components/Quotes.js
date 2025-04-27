// src/components/Quotes.js
import React, { useState, useEffect } from "react";
import "../assets/styles.css"; // Updated to use the new location of the consolidated CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

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
        <div className="page-container" id="quotes-page-container">
            <h2>Quotes</h2>
            <div className="input-button-container">
                <input
                    type="text"
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    placeholder="Enter a new quote"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addQuote();
                        }
                      }}
                />
                <button onClick={addQuote}>Add Quote</button>
            </div>

            <div id="quotes-table">
                <table className="display-table">
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
                                    <button onClick={() => deleteQuote(quote.id)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="page-footer" id="quotes-footer">
  <p>Note: Quotes are saved in local storage. Refreshing the page will not delete them.</p>
</div>
        </div>
    );
}

export default Quotes;