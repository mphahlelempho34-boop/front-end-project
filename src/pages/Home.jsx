
import { useState } from "react";
import Books from "../../components/Books";

import The4OfUs from "../../components/the4ofus.jpg";
import Uzalo from "../../components/Uzalo.jpg";
import Skeem from "../../components/Skeem.jpg";
import axios from "axios";

function Home({ favorites, onFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");



  
    const [books, setBooks] = useState(null);
  
  
    let url = "http://localhost:8080/api/books";
  
   async function  fetchBooks() { 
            try{
                const {data } = await axios.get(url, {
                    headers: { Accept: "application/json" },
                });
  
  
  
                setBooks(data);
                
                console.log("Books received: ", data );
  
            }catch(error) {
                console.log(error.response, "Failed to fetch books")
            }
        }
  
  // const books = [
  //   {
  //     id: 1,
  //     title: "The Four Of Us",
  //     author: "Kamogelo",
  //     url: The4OfUs,
  //   },
  //   {
  //     id: 2,
  //     title: "Uzalo",
  //     author: "Mpho",
  //     url: Uzalo,
  //   },
  //   {
  //     id: 3,
  //     title: "Skeem Saam",
  //     author: "Nyiko",
  //     url: Skeem,
  //   },
  // ];
    

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a book..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

    <button onClick={fetchBooks}>Get new books</button>
      <div className="books-grid">
        {books
          ?.filter((book) =>
            book.title
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase())
          )
          .map((book) => (
            <Books
              key={book.id}
              book={book}
              onFavorite={onFavorite}
              isFavorite={favorites.some(
                (item) => item.id === book.id
              )}
            />
          ))}
      </div>
    </>
  );
}

export default Home;

