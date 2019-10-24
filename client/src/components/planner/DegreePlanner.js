import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    searchBar: {
        width: "80%",
        margin: "auto",
        paddingTop: "2%"
    }
});

export default function DegreePlanner() {
    const classes = useStyles();

    const [course, setCourse] = useState({});
    const [prereqs, setPrereqs] = useState([]);
    const [postreqs, setPostreqs] = useState([]);

    const [courses, setCourses] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);

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
                    // course info retrieved successfully here
                    console.log(res)
                })
        }
    }, [course, setCourse, courses]);

    const handleSearchValueChange = value => {
        setCourse(value.value);
        setPrereqs([]);
        setPostreqs([]);
    };

    return (
        <div>
            <h1>Degree Planner</h1>
            <Select
                className={classes.searchBar}
                isSearchable
                isLoading={!Object.keys(courses).length}
                options={courseOptions}
                onChange={handleSearchValueChange}
            />
        </div>
    );
}
