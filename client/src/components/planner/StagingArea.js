import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import CourseCard from "./CourseCard";

const useStyles = makeStyles({
    searchBar: {
        width: "100%",
        margin: "auto",
        paddingTop: "2%"
    }
});

export default function StagingArea() {
    const classes = useStyles();

    const [course, setCourse] = useState({});

    useEffect(() => {

    }, [course, setCourse]);

    return (
        <div>
            <CourseCard
                courseName={"Test"}
                courseCode={"123"}
            />
            <CourseCard
                courseName={"Test"}
                courseCode={"123"}
            />
            <CourseCard
                courseName={"Test"}
                courseCode={"123"}
            />
        </div>
    );
}
