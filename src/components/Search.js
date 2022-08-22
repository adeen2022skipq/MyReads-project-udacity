import { Link } from "react-router-dom";
import Book from "./Book";

const Search = ({ query, searchQuery, searchedBooks, changeShelf }) => {
    return (
        <div className="search-books">
        <div className="search-books-bar">
            <Link to="/">
          <a
            className="close-search"
          >
            Close
          </a>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN" value={query} onChange={(e) => searchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {searchedBooks.map( book => (
                         <li key={book.id}>
                            <Book book={book} changeShelf={changeShelf} />
                       </li>

                    ))}
          </ol>
        </div>
      </div>
    );
};

export default Search;