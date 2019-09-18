import React from 'react';
import Typography from '@material-ui/core/Typography';
import NavBar from '../common/NavBar';
import Course from './Course';

export default function Pathways() {

    return(
      <div>
        <NavBar />
        <Typography variant="title" color="inherit">
          Pathways
          <Course/>
        </Typography>
      </div>
    );
}
