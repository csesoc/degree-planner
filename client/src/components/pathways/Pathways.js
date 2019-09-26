import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { ArcherContainer, ArcherElement } from 'react-archer';
import Typography from '@material-ui/core/Typography';
import NavBar from '../common/NavBar';
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

export default function Pathways() {

    const classes = useStyles();
    const [course, setCourse] = useState({});
    const [prereqs, setPrereqs] = useState([]);
    const [postreqs, setPostreqs] = useState([]);
    const [courses, setCourses] = useState({});
    const [courseCards, setCourseCards] = useState([]);

    // On Component mounting request course data from server and then transform into the cards
    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/courses')
           .then(res => res.json())
           .then(res => setCourses(res))
           .catch((error) => console.log(error.message));
      }

      async function fetchReqs(code) {
        const response = await fetch('/api/relations/' + code)
          .then(res => res.json())
          .then(res => {
            for (let [key, val] of Object.entries(res.relations)) {
              if (val.type !== 'prerequisite') {
                continue
              }
              if (val.destination === code) {
                let srcCourse = findCourse(val.source);
                if (srcCourse === undefined) {
                    continue
                } else {
                  setPostreqs(postreqs => [...postreqs, srcCourse]);
                }
              } else if (val.source === code) {
                let destCourse = findCourse(val.destination);
                if (destCourse === undefined) {
                  continue
                } else {
                  setPrereqs(prereqs => [...prereqs, destCourse]);
                }
              }
            }
          });
      }
        
      if (!Object.keys(courses).length) {
        fetchData();
      } else {
        if (!courseCards.length) {
          setCourseCards(courses["courses"].map((courseObj) => {
            return courseObjToCard(courseObj);
          }));
          setCourse(findCourse('COMP2041'));
          fetchReqs('COMP2041');
        }
      }
    }, [course, courses, courseCards, prereqs, postreqs, findCourse]); 

    function findCourse(code) {  
      return courses["courses"].find(course => course.code === code);
    };

    function courseObjToCard(courseObj) {
      return (<Course className={classes.courseCard} key={courseObj.code} data={courseObj} />);
    };

    function courseObjToPrereqArcher(courseObj) {
      let rel = {
        targetId: course.code,
        targetAnchor: 'left',
        sourceAnchor: 'right',
      };
      return (
        <ArcherElement key={courseObj.code} id={courseObj.code} relations={[rel]}>
          {courseObjToCard(courseObj)}
        </ArcherElement>
      );
    };

    function courseObjToPostReqArcher(courseObj) {
      return (
        <ArcherElement key={courseObj.code} id={courseObj.code}>
          {courseObjToCard(courseObj)}
        </ArcherElement>
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
        <ArcherElement id={course.code} relations={postReqRelations}>
          {courseObjToCard(course)}
        </ArcherElement>
      );
    }

    // Have to do this because if react-archer renders this before it has code to work off, arrows don't generate properly forever.
    if (course.code !== undefined) {
      return(
        <div>
          <NavBar />
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
    } else {
      return(
        <div>
          <NavBar />
        </div>
      );
    }
}
