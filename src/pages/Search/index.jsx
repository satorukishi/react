import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

class Search extends Component {
    constructor() {
        super();

        this.onSearch = this.onSearch.bind(this);

        this.state = {
            results: [],
        }
    }

    onSearch(event) {
        const value = event.currentTarget.value;

        if (value.length > 5) {
            console.log(value);

            axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${value}`)
                .then(({ data }) => {
                    console.log(data);

                    this.setState({
                        results: data.results,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div>
                <input type="text" onChange={ this.onSearch } />

                <ul>
                    {this.state.results.map(this.renderItem) }
                </ul>

            </div>

        );
    }

    renderItem(item) {
        return (
            <li key={ item.id }>
                <span>{ item.id }</span>
                <span>{ item.title }</span>
                &#160;
                <Link to={ `/Details/${item.id}` }>
                    Abrir produto
                </Link>
            </li>
        );
    }
}

export default Search;