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

        var shelfOptionValues = [
            { value: "currentlyReading", caption: "Currently Reading" },
            { value: "wantToRead", caption: "Want to Read" },
            { value: "read", caption: "Read" }
        ];

        var shelfOptions = shelfOptionValues.map((option)=>{
            return (<option value={option.value}>{option.caption}</option>);
        })

        return (
            <div className="book-shelf-changer">
            <select onChange={ (event)=>this.changeShelf(event.target.value) } value={ this.state.shelf }>
                <option disabled>Move to...</option>
                {shelfOptions}
                {this.state.shelf!=='none' ? <option value="none">None</option> : ''}
            </select>
        </div>
        );
    }
}

export default BookShelfChanger;