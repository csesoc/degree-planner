import React from 'react';
import {makeStyles} from "@material-ui/core";
import CourseCard from "./CourseCard";

const useStyles = makeStyles({
    stagingArea: {
        margin: "1em 0",
    }
});

export default function StagingArea(props) {
    const classes = useStyles();

    return (
        <div className={classes.stagingArea}>
            {props.courses.map((course, index) => {
                return (
                    <CourseCard
                        key={index}
                        courseName={course.value.name}
                        courseCode={course.value.code}
                        onRemove={() => props.onRemoveCourse(course)}
                    />
                );
            })}
        </div>
    );
}
