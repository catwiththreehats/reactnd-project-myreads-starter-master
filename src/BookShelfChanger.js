import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelfChanger extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeBookShelf: PropTypes.func.isRequired
    }

    state = {
        shelf: ''
    }

    componentDidMount() {
        this.setState({ shelf: this.props.book.shelf });
    }

    changeShelf(shelf) {
        this.setState({ shelf: shelf });
        this.props.onChangeBookShelf( this.props.book, shelf );
    }

    render() {
        return (
            <div className="book-shelf-changer">
            <select onChange={ (event)=>this.changeShelf(event.target.value) } value={ this.state.shelf }>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                {this.state.shelf!=='none' ? <option value="none">None</option> : ''}
            </select>
        </div>
        );
    }
}

export default BookShelfChanger;