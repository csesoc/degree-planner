import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import NavBar from '../common/NavBar';
import Course from './Course';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

});

export default function Pathways() {

    const classes = useStyles();
    const [courses, setCourses] = useState({});
    const [courseCards, setCourseCards] = useState([]);

    // On Component mounting request course data from server
    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/courses')
           .then(res => res.json())
           .then(res => setCourses(res))
           .catch((error) => console.log(error.message));
      }
      if (!Object.keys(courses).length) {
        fetchData();
      } else {
        if (!courseCards.length) {
          setCourseCards(courses["courses"].map((courseObj) => {
            return (
              <Course data={courseObj} /> 
            );
          }));
        }
      }
    }, [courses, courseCards]); 

    return(
      <div>
        <NavBar />
        {courseCards}
      </div>
    );
}
