import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Wizard from './planner/Wizard';
import Pathways from './pathways/Pathways';

const App = () => {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Wizard}/>
          <Route exact path='/pathways' component={Pathways}/>
        </Switch>
      </div>
    );
}

export default App;
