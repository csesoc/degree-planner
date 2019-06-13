import React, { Component }  from 'react';
import { Switch, Route } from 'react-router-dom';
import Example from './Example';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Example}/>
        </Switch>
      </div>
    );
  }
}

export default App;
