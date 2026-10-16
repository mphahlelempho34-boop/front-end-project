import "./Books.css";
import { useState } from 'react';

function Books({ book, onFavorite, isFavorite, onDelete, onShowInfo }) {
  // State to track if the dropdown menu is visible
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  return (
    <div className="book">
      <div className="book-poster">
        <img
          className="images"
          src={book.imageUrl}
          alt={book.title}
        />

        <div className="book-overlay">
          {/* Action container aligned to the top right */}
          <div className="overlay-actions-top-right">
            
            {/* Original Heart Button */}
            <button
              className="favorite-btn"
              onClick={() => onFavorite(book)}
            >
              {isFavorite ? "♥" : "♡"}
            </button>

            {/* Three-Dot Options Button */}
            <div className="options-container">
              <button className="options-btn" onClick={toggleMenu}>
                ⋮
              </button>
              
              {/* Dropdown Options Menu */}
              {showMenu && (
                <div className="dropdown-menu">
                  {/* Safely check if onShowInfo exists before calling it */}
                  <button onClick={() => { onShowInfo && onShowInfo(book); setShowMenu(false); }}>
                    🛈 More Info
                  </button>
                  <button className="delete-option" 
                    onClick={() => { 
                      onDelete(book.id); // This now executes the state change back up in Home!
                      setShowMenu(false); 
                    }}>
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>
        <p>Author: {book.author}</p>
      </div>
    </div>
  );
}

export default Books;
