import React, { Component, Fragment } from 'react';
import { Button } from 'react-dom';
import axios from 'axios';
import './style.css'

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            loading: true,
            data: {},
        };

    }
    
    componentDidMount() {
        axios.all([
            axios.get(`https://api.mercadolibre.com/items/${this.state.id}`),
            axios.get(`https://api.mercadolibre.com/items/${this.state.id}/description`)
        ])
            .then(([item, description]) => { // { data } é um destructor
                console.log(item, description);

                // auto-assign
                this.setState({ // sempre que chamar o setState, ele chama o render() novamente
                    data: {
                        ...item.data, // ... = spread (joga tudo que tem dentro de item.data na data: )
                        description: description.data.plain_text,
                    },
                    loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleClick(url) {
        window.location.href = url;
    }

    renderConteudo() {
        const { data } = this.state;
        return (
            <Fragment>
                <section className="mdl-layout section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                    <header className="mdl-cell mdl-cell--6-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone">
                        <img src={ data.pictures[0].url } />
                    </header>
                    <div className="mdl-card mdl-cell mdl-cell--6-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone produto__info">
                        <div className="mdl-card__supporting-text">
                            { data.sold_quantity } vendidos
                            <h5>{ data.title }</h5>
                            <h3>{ "R$ " + data.price.toFixed(2).replace(".", ",") }</h3>
                        </div>
                        
                        <div className="mdl-cell mdl-cell--12-col-desktop mdl-cell--8-col-tablet mdl-cell--0-col-phone">
                            <button className="produto__comprar button" onClick={ () => this.handleClick(data.permalink) }>Comprar no Mercado Livre</button>
                        </div>
                    </div>
                    <p className="mdl-cell mdl-cell--12-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone produto__descricao">
                        <h3>Descrição</h3>
                        { data.description }
                    </p>
                </section>
            </Fragment>
        );
    }

    render() {
        const { loading } = this.state;
        
        return loading ?
            <div>Carregando...</div> :
            this.renderConteudo();
    }
    
}

export default Details;