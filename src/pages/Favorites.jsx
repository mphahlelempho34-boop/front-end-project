import Books from "../../components/Books";
import "./Favorites.css"
import NavBar from "./NavBar";

function Favorites({ favorites, onFavorite }) {
  return (
    <>
    <NavBar/>
    <div>
      {favorites.length === 0 ? (
        <div className="favorite-empty">
          <br/>
          <h2>No favorite books yet</h2>

          <p>
            Start adding books to your favorites and they will appear here.
          </p>
        </div>
      ) : (
      
        <div className="books-grid">
        
          {favorites.map((book) => (
            <Books
              key={book.id}
              book={book}
              onFavorite={onFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Favorites;
