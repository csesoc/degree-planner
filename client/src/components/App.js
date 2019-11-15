import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import Theme from './common/Theme';
import Plannify from './planner/Plannify';
import Pathways from './pathways/Pathways';

const App = () => {
    return (
      <ThemeProvider theme={Theme}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Plannify}/>
            <Route exact path='/pathways' component={Pathways}/>
          </Switch>
        </div>
     </ThemeProvider>
    );
}

export default App;
