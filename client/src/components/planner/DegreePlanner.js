import React, {useEffect, useState} from 'react';
import Select from "react-select";
import Board from '@lourenci/react-kanban'
import {makeStyles} from "@material-ui/core";
import incrementGenerator from 'increment-generator';
import StagingArea from "./StagingArea";
import './timetable.css';

const getNextID = incrementGenerator();
getNextID();    // not use 0 as it causes issues

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

// the default empty course board
const board = {
    lanes: [
        {
            id: getNextID(),
            title: 'Staging Area',
            cards: []
        },
        {
            id: getNextID(),
            title: '2020 T1',
            cards: []
        },
        {
            id: getNextID(),
            title: '2020 T2',
            cards: []
        },
        {
            id: getNextID(),
            title: '2020 T3',
            cards: []
        },
        {
            id: getNextID(),
            title: '2021 T1',
            cards: []
        },
        {
            id: getNextID(),
            title: '2021 T2',
            cards: []
        },
        {
            id: getNextID(),
            title: '2021 T3',
            cards: []
        },
        {
            id: getNextID(),
            title: '2022 T1',
            cards: []
        },
        {
            id: getNextID(),
            title: '2022 T2',
            cards: []
        },
        {
            id: getNextID(),
            title: '2022 T3',
            cards: []
        },
    ]
};


export default function DegreePlanner() {
    const classes = useStyles();

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
        }
    });

    const handleSearchValueChange = value => {
        // add course (code + name) to staging area
        stageCourse(value.value.code, value.value.name);
    };

    // add a course to staging area
    function stageCourse(courseID, courseName) {
        titleToAdd = courseID;
        nameToAdd = courseName;
        // imitating a click action which is required to add a card to lane
        document.querySelector('#addCourseHiddenButton').click();
    }

    // these 2 vars would be set when stageCourse is called
    let titleToAdd;
    let nameToAdd;
    function renderHeaderWithCardAdder({title}, {addCard}) {
        return (
            <>
                <div id='laneTitle'>{title}</div>
                <button id='addCourseHiddenButton' type='button' hidden
                        onClick={() => addCard({id: getNextID(), title: titleToAdd, description: nameToAdd})}>Add Card
                </button>
            </>
        );
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
            <Board
                className={classes.timetable}
                disableLaneDrag
                allowAddLane
                allowRemoveCard
                renderLaneHeader={renderHeaderWithCardAdder}
                onLaneRemove={console.log}
                onCardRemove={console.log}
                onLaneRename={console.log}
                onCardDragEnd={console.log}
                onCardNew={console.log}
            >{board}</Board>
        </>
    );
}
