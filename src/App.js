import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
// import * as BooksAPI from './BooksAPI'
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books} />
        )}
        />
        <Route path="/search" render={({ history }) => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
