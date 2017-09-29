import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    modalContent: {
      heading: '',
      body: '',
      visible: false
    },
    loading: false
  }

  componentDidMount() {
    this.refreshBooks();
  }

  changeBookShelf = (book, targetShelf) => {
    BooksAPI.update(book, targetShelf).then((result)=>{
      console.log(result);

      /*
      let books = this.state.books;
      let changedBooks = [];

      result.currentlyReading.forEach((bookId)=>{
        let book = books.find((book)=>book.id===bookId);
        book.shelf = 'currentlyReading';
        changedBooks.push(book);
      });

      result.wantToRead.forEach((bookId)=>{
        let book = books.find((book)=>book.id===bookId);
        book.shelf = 'wantToRead';
        changedBooks.push(book);
      });

      result.read.forEach((bookId)=>{
        let book = books.find((book)=>book.id===bookId);
        book.shelf = 'read';
        changedBooks.push(book);
      });

      this.setState({ books: changedBooks });
      */
      this.refreshBooks();
    });
  }

  showModalContent = (heading, body) => {
    this.setState({
      modalContent: {
        heading: heading,
        body: body,
        visible: true
      }
    });
  }

  closeModalContent = () => {
    this.setState({
      modalContent: {
        heading: '',
        body: '',
        visible: false
      }
    });
  }

  refreshBooks = () => {
    this.setState({loading:true});
    BooksAPI.getAll().then((books) => {
      this.setState({loading:false});
      console.log(books)
      this.setState({ books });
    });
  }

  render() {

    const { modalContent, loading } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} onChangeBookShelf={this.changeBookShelf} showModalContent={this.showModalContent} />
        )}
        />
        <Route path="/search" render={({ history }) => (
          <SearchBooks onChangeBookShelf={this.changeBookShelf} books={this.state.books} showModalContent={this.showModalContent} />
        )} />
        {modalContent.visible && (
        <div className="modal" onClick={ this.closeModalContent }>
            <div className="modal-content">
                <h3>{modalContent.heading}</h3>
                <p>{modalContent.body}</p>
            </div>
        </div>)}
      </div>
    );
  }
}

export default BooksApp
