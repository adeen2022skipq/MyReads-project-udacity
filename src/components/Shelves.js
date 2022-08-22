import Shelf from "./Shelf";

const Shelves = ({ allBooks, changeShelf }) => {

    const currentlyReading = allBooks.filter( book => book.shelf === "currentlyReading");
    const wantToRead = allBooks.filter( book => book.shelf === "wantToRead");
    const read = allBooks.filter( book => book.shelf === "read");
    
    return (
        <div className="list-books-content">
            <div>
              <Shelf books={currentlyReading} title={"Currently Reading"} changeShelf={changeShelf} />
              <Shelf books={wantToRead} title={"Want To Read"} changeShelf={changeShelf} />
              <Shelf books={read} title={"Read"} changeShelf={changeShelf} />
            </div>
          </div>
    );
};

export default Shelves;