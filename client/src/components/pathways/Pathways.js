import React from 'react';
import Typography from '@material-ui/core/Typography';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import Course from './Course';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

});

// TODO install react-archer to doarrow things
// Add search component to search for courses
    // Click a course should rerender pathways component
export default function Pathways() {

    const classes = useStyles();

    return(
      <div>
        <NavBar />
        <Typography variant="title" color="inherit">
          Pathways
          <Course/>
        </Typography>
        <Footer />
      </div>
    );
}
