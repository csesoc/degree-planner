import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { ArcherContainer, ArcherElement } from 'react-archer';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
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
  }
});

// TODO 
//   Load search options async? 
//   Search should perhaps just send requests for current text to Backend and return possible options
//   Make this more efficient, it is very slow! (by probably moving things out of useEffect)
//   Fix CSS on Course Cards so arrows touch properly
//   Fix CSS so search bar isnt touching top
//   Add onClick to cards so can rerender with selected card as the subject
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
      async function fetchData() {
        const response = await fetch('/api/courses')
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
      }

      console.log("yeet");
      if (!Object.keys(courses).length) {
        console.log("yeetb");
        fetchData();
      } else if (Object.keys(course).length) {
        const relations = fetch('/api/relations/' + course.code)
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

    function courseObjToCard(courseObj, relations) {
      return (<Course className={classes.courseCard} key={courseObj.code} data={courseObj} relations={relations}/>);
    };

    function courseObjToPrereqArcher(courseObj) {
      const relations=[{
              targetId: course.code,
              targetAnchor: 'left',
              sourceAnchor: 'right'
          }]
      return (
          courseObjToCard(courseObj, relations)
      );
    };

    function courseObjToPostReqArcher(courseObj) {
      return (
          courseObjToCard(courseObj, [{}])
      );
    }

    function courseToSelectedCourseArcher() {
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
    };

    if (archerRenderComplete) {
      return (
        <div>
          <NavBar />
          <Select
            isSearchable={true}
            isLoading={false}
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
        </div>
      );
    } else if (Object.keys(courses).length){
      // Search results loaded but user has not chosen a course, cannot render archer stuff until then so just show search bar?
      return (
        <div>
          <NavBar />
          <Select
            isSearchable={true}
            isLoading={false}
            options={courseOptions}
            onChange={handleSearchValueChange}
          />
          <Footer />
        </div>
      );
    } else {
      // Search options ahvent loaded, should put a spinner here probably
      return (
        <div>
          <NavBar />
          <Select
            isSearchable={true}
            isLoading={true}
            options={courseOptions}
            onChange={handleSearchValueChange}
          />
          <Footer />
        </div>
      );
    }
}
