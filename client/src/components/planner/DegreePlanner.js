import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {makeStyles, GridList, GridListTile, Box, Chip} from "@material-ui/core";

const useStyles = makeStyles({
    searchBar: {
        width: "80%",
        margin: "auto",
        paddingTop: "2%"
    }
});

export default function DegreePlanner() {
    const classes = useStyles();
    var memes = ["the","selections","will","automatically","generate","a","list","of","subjects","for","each","term"]

    const [course, setCourse] = useState({});
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
    };

    return (
        <div>
        <GridList cellHeight={160} cols={3}>
            {memes.map((word, key) => (
                <GridListTile key={key} cols={word.cols || 1}>
                    <Box border={1} className="box-container" borderColor="primary.main">

                    </Box>
                </GridListTile>
            ))}
            </GridList>
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
