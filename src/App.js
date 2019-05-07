import React, {Component} from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import './App.css';

import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Routes />
        </Router>
      </div>
    );
  }
  
}

export default App;
