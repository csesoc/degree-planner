import React from 'react';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    courseCard: {
        display: "inline-block",
        width: "fit-content",
        margin: "2px",
        padding: "2px",
        borderRadius: "2px",
        background: "grey"
    },
    courseName: {
        fontsize: "1.5em"
    },
    courseCode: {
        fontsize: "1em"
    }
});

export default function CourseCard(props) {
    const classes = useStyles();

    return (
        <div className={classes.courseCard}>
            <div className={classes.courseName}>
                {props.courseName}
            </div>
            <div className={classes.courseCode}>
                {props.courseCode}
            </div>
        </div>
    );
}
