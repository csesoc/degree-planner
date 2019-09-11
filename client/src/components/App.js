import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Plannify from './planner/Plannify';
import Pathways from './pathways/Pathways';

const App = () => {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Plannify}/>
          <Route exact path='/pathways' component={Pathways}/>
        </Switch>
      </div>
    );
}

export default App;
