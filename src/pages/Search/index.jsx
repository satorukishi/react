import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import './style.css'

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
            <div className="mdl-grid">
                <div className="mdl-cell--12-col">
                    <input type="text" className="busca" onChange={ this.onSearch } placeholder="Buscar produtos, marcas e muito mais..." maxLength="120" tabIndex="2" />
                    <ul>
                        {this.state.results.map(this.renderItem) }
                    </ul>
                </div>
            </div>

        );
    }

    renderItem(item) {
        return (
            <li key={ item.id } className="pesquisa__item">
                <div className="mdl-grid">
                    <div className="mdl-cell--12-col">
                        <Link to={ `/Details/${item.id}` }>
                            <h6>{ item.title }</h6>
                        </Link>
                    </div>
                    <div className="mdl-cell--12-col pesquisa__preco">
                        R$ {item.price.toFixed(2).replace(".", ",") }
                    </div>
                    <div className="mdl-cell--12-col">
                        { item.sold_quantity } vendidos
                    </div>
                </div>
            </li>
        );
    }
}

export default Search;