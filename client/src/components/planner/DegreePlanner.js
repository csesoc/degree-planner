import React, {useEffect, useState} from 'react';
import Select from "react-select";
import Board from '@lourenci/react-kanban'
import {makeStyles} from "@material-ui/core";
import StagingArea from "./StagingArea";
import './timetable.css';

const useStyles = makeStyles({
    searchBar: {
        width: "95%",
        margin: "auto",
        paddingTop: "2%"
    },
    timetable: {
        width: "100%"
    }
});

const board = {
    lanes: [
        {
            id: 0,
            title: 'Staging Area',
            cards: [
                {
                    id: 9,
                    title: 'Computer System',
                    description: 'COMP3123'
                },
            ]
        },
        {
            id: 1,
            title: 'T1',
            cards: [
                {
                    id: 4,
                    title: 'Computer System',
                    description: 'COMP3123'
                },
            ]
        },
        {
            id: 2,
            title: 'T2',
            cards: [
                {
                    id: 5,
                    title: 'Computer System',
                    description: 'COMP3123'
                },
            ]
        },
        {
            id: 3,
            title: 'T3',
            cards: [
                {
                    id: 6,
                    title: 'Computer System',
                    description: 'COMP3123'
                },
            ]
        },
        {
            id: 7,
            title: 'T3',
            cards: [
                {
                    id: 8,
                    title: 'Computer System',
                    description: 'COMP3123'
                },
            ]
        },
    ]
}


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
            <Board
                className={classes.timetable}
                disableLaneDrag
                allowAddLane
                allowRemoveCard
                onLaneRemove={console.log}
                onCardRemove={console.log}
                onLaneRename={console.log}
            >{board}</Board>
        </>
    );
}
