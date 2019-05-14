import React, { Component, Fragment } from 'react';
import axios from 'axios';

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

    renderConteudo() {
        const { data } = this.state;
        return (
            <Fragment>
                <section className="mdl-layout section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                    <header className="mdl-cell mdl-cell--6-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone">
                        <img src={ data.pictures[0].url } />
                    </header>
                    <div className="mdl-card mdl-cell mdl-cell--6-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone">
                        <div className="mdl-card__supporting-text">
                            <h5>{ data.title }</h5>
                            { data.price}
                        </div>
                        <button>Comprar</button>
                    </div>
                    <p className="mdl-cell mdl-cell--12-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone ">
                        { data.description}
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