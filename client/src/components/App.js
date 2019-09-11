import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Wizard from './Wizard';
import '../css/App.css';

const App = () => {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Wizard}/>
        </Switch>
      </div>
    );
}

export default App;
