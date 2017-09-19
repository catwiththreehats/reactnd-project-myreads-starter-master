import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';

class BookShelf extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        onChangeBookShelf: PropTypes.func.isRequired
    }

    render() {

        const { books, title, onChangeBookShelf } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <BooksGrid books={books} onChangeBookShelf={ onChangeBookShelf } />
                </div>
            </div>
        );
    }
}

export default BookShelf;