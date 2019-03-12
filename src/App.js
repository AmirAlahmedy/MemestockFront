import React, { Component } from 'react';
import './App.css';
import Home from './Routes/Home';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Home />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
