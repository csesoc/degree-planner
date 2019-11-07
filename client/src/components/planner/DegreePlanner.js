import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {makeStyles} from "@material-ui/core";
import StagingArea from "./StagingArea";

const useStyles = makeStyles({
    searchBar: {
        width: "80%",
        margin: "auto",
        paddingTop: "2%"
    }
});

export default function DegreePlanner() {
    const classes = useStyles();

    const [courses, setCourses] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);
    const [courseStaging, setCourseStaging] = useState([]);

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
        }
    });

    const handleSearchValueChange = value => {
        // add course (code + name) to staging area
        setCourseStaging([...courseStaging, value]);
    };

    function handleRemoveCourseStaging(course) {
        // remove a particular course from staging list
        const courseStagingRemoved = [...courseStaging].filter(function (el) {
            return el !== course;
        });
        setCourseStaging(courseStagingRemoved);
    }

    return (
        <>
            <h1>Degree Planner</h1>
            <Select
                className={classes.searchBar}
                isSearchable
                isLoading={!Object.keys(courses).length}
                options={courseOptions}
                onChange={handleSearchValueChange}
            />
            <StagingArea
                courses={courseStaging}
                onRemoveCourse={handleRemoveCourseStaging}
            />
        </>
    );
}
