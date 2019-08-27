import React, { Component }  from 'react';
import { Switch, Route } from 'react-router-dom';
import Wizard from './Wizard';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Wizard}/>
        </Switch>
      </div>
    );
  }
}

export default App;
