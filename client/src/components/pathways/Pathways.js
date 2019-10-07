import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { ArcherContainer } from 'react-archer';
import Select from 'react-select';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import Course from './Course';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  grid: {
  },
  gridItem: {
    padding: "1%",
  },
  courseCard: {
  },
  searchBar: {
    width: "80%",
    margin: "auto",
    paddingTop: "2%"
    
  }
});

// TODO 
//   Call courses data on app launch and pass through to pathways? Otherwise can still do it here?
//   Manually implement filter on courses or backend call with search param...
//   Find a way to somehow represent exclusions? (maybe add to middle column with same arrows??)
export default function Pathways() {

    const classes = useStyles();
    
    const [course, setCourse] = useState({});
    const [prereqs, setPrereqs] = useState([]);
    const [postreqs, setPostreqs] = useState([]);
    
    const [courses, setCourses] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);

    // Only render react-archer components after we finalise results, otherwise arrows don't render properly
    const [archerRenderComplete, setArcherRenderComplete] = useState(false);

    useEffect(() => {
      if (!Object.keys(courses).length) {
        fetch('/api/courses')
          .then(res => res.json())
          .then(res => {
            setCourses(res);
            setCourseOptions(res.courses.map((obj) => {
              return ({
                "label": obj.code,
                "value": obj,
              });
            }));
          })
          .catch((error) => console.log(error.message));
      } else if (Object.keys(course).length) {
        fetch('/api/relations/' + course.code)
            .then(res => res.json())
            .then(res => {
              Object.values(res.relations).forEach(val => {
                let relatedCourse = {};
                if (val.destination === course.code && val.type === 'prerequisite') {
                  relatedCourse = courses["courses"].find(course => course.code === val.source);
                  if (relatedCourse === undefined) {
                    console.log("Could not locate course " + val.source + " in the database");
                  } else {
                    setPostreqs(postreqs => [...postreqs, relatedCourse]);
                  }
                } else if (val.source === course.code && val.type === 'prerequisite') {
                  relatedCourse = courses["courses"].find(course => course.code === val.destination);
                  if (relatedCourse === undefined) {
                    console.log("Could not locate course " + val.destination + " in the database");
                  } else {
                    setPrereqs(prereqs => [...prereqs, relatedCourse]);
                  }
                } else {
                  console.log("Course: " + course.code + " has no relations to " + val.source + " or " + val.destination);
                }
              });
            })
            .then(res => {
              setArcherRenderComplete(true);  
            });  
      }
    }, [course, setCourse, courses, setArcherRenderComplete]);

    const courseObjToCard = (courseObj, relations) => {
      return (
          <Course 
            className={classes.courseCard} 
            key={courseObj.code} 
            data={courseObj} 
            relations={relations} 
            onClick={handleSearchValueChange}
          />
      );
    };

    const courseObjToPrereqArcher = (courseObj) => {
      const relations=[{
              targetId: course.code,
              targetAnchor: 'left',
              sourceAnchor: 'right'
          }]
      return (
          courseObjToCard(courseObj, relations)
      );
    };

    const courseObjToPostReqArcher = (courseObj) => {
      return (
          courseObjToCard(courseObj, undefined)
      );
    }

    const courseToSelectedCourseArcher = () => {
      let postReqRelations = postreqs.map(obj => {
        return ({
          targetId: obj.code,
          targetAnchor: 'left',
          sourceAnchor: 'right'
        });
      });
      return (
          courseObjToCard(course, postReqRelations)
      );
    }

    const handleSearchValueChange = value => {
      if (archerRenderComplete) {
        setArcherRenderComplete(false);
      }
      setCourse(value.value);
      setPrereqs([]);
      setPostreqs([]); 
    };

    if (archerRenderComplete) {
      return (
        <div>
          <NavBar />
          <Select
            className={classes.searchBar}
            isSearchable
            options={courseOptions}
            onChange={handleSearchValueChange}
          />
          <ArcherContainer>
            <Grid container className={classes.grid}  direction="row" justify="center" alignItems="center" alignContent="center">
              <Grid item className={classes.gridItem} xs={4} justify="center">
                {prereqs.map(obj => courseObjToPrereqArcher(obj))}
              </Grid>
              <Grid item className={classes.gridItem} xs={4} justify="center">
                  {courseToSelectedCourseArcher()}
              </Grid>
              <Grid item className={classes.gridItem} xs={4} justify="center">
                  {postreqs.map(obj => courseObjToPostReqArcher(obj))}
              </Grid>
            </Grid>
          </ArcherContainer>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <NavBar />
          <Select
            className={classes.searchBar}
            isSearchable
            isLoading={!Object.keys(courses).length}
            options={courseOptions}
            onChange={handleSearchValueChange}
          />
          <Footer />
        </div>
      );
    }
}
