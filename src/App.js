import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.refreshBooks();
  }

  changeBookShelf = (book, targetShelf) => {
    BooksAPI.update(book, targetShelf).then((result)=>{
      this.refreshBooks();
    });
  }

  refreshBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} onChangeBookShelf={this.changeBookShelf} />
        )}
        />
        <Route path="/search" render={({ history }) => (
          <SearchBooks onChangeBookShelf={this.changeBookShelf} books={this.state.books} />
        )} />
      </div>
    );
  }
}

export default BooksApp
