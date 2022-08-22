import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Shelves from "./components/Shelves";
import Search from "./components/Search";
import SearchButton from "./components/SearchButton";
import Header from "./components/Header";
import * as BooksAPI from "./BooksAPI";

function App() {

  const [books, setBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [mergedBooks, setMergedBooks] = useState([]);

  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  const [query, setQuery] = useState("");

  const searchQuery = (q) => {
    setQuery(q);
  }

  const changeBookShelf = (book, shelf) => {
    const updatedBooks = books.map(b => {
      if (b.id === book.id) {
        book.shelf = shelf;
        return book;
      }
      return b;
    });
    if (!mapOfIdToBooks.has(book.id)){
      book.shelf = shelf;
      updatedBooks.push(book);
    }
    BooksAPI.update(book, shelf);
    setBooks(updatedBooks);
  };

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  };

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
      setMapOfIdToBooks(createMapOfBooks(res));
    };

    getBooks();
  }, []);

  useEffect(() => {

    let isActive = true;

    if (query) {
      BooksAPI.search(query).then(data => {
        if (data.error) {
          setSearchedBooks([]);
        } else {
          if (isActive) {
            setSearchedBooks(data);
          }
        }
      })
    }

    return () => {
      isActive = false;
      setSearchedBooks([]);
    }

  }, [query]);

  useEffect(() => {
    const merged = searchedBooks.map(book => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      }
      else {
        return book;
      }
    });
    setMergedBooks(merged);
  }, [searchedBooks]);

  return (
    <div className="app">
      <Routes>
          <Route path="/search" element={
          <Search query={query} searchQuery={searchQuery} searchedBooks={mergedBooks} changeShelf={changeBookShelf} />
          }
          />
            
          <Route exact path="/" element={
          <div className="list-books">
              <Header />
              <Shelves allBooks={books} changeShelf={changeBookShelf} />
              <Link to="/search">
              <SearchButton />
              </Link>
            </div>
          } 
          />
      </Routes>
    </div>
  );
}

export default App;
