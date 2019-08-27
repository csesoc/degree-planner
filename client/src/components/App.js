import React from 'react';
import { Switch, Route } from 'react-router-dom';

/* Components */
import Home from '../containers/Home';

const App = () => {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </div>
    );
}

export default App;
