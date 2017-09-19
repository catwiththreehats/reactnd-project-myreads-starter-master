import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeBookShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim(), books: [] });
        if (query.length >= 3) {
            BooksAPI.search(query, 100).then((result) => {
                if (result.error) {
                    this.setState({ books: [] });
                } else {
                    this.setState({
                        books: result.map((book) => {
                            let bookInCollection = this.props.books.find((bookInShelves) => bookInShelves.id === book.id);
                            book.shelf = bookInCollection ? bookInCollection.shelf : 'none';
                            return book;
                        })
                    });
                }
            });
        }
    }

    render() {

        const { onChangeBookShelf } = this.props;
        const { books, query } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid books={books} onChangeBookShelf={onChangeBookShelf} />
                </div>

            </div>
        );
    }

}

export default SearchBooks;