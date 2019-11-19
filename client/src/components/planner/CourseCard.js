import React from 'react';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    courseCard: {
        display: "inline-block",
        width: "fit-content",
        margin: "2px",
        padding: "5px",
        borderRadius: "5px",
        background: "#eee",
        position: "relative",
    },
    courseName: {
        fontsize: "1em",
    },
    courseCode: {
        fontsize: "2em",
        fontWeight: "bold"
    },
    cancelButton: {
        backgroundColor: "red",
        border: "none",
        color: "white",
        padding: "auto",
        margin: "auto",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "1em",
        cursor: "pointer",
        borderRadius: "50%",
        position: "absolute",
        right: "0",
        top: "0",
        width: "1.1em",
        height: "1.1em",
    }
});

export default function CourseCard(props) {
    const classes = useStyles();

    return (
        <div className={classes.courseCard}>
            <div className={classes.courseCode}>
                {props.courseCode}
            </div>
            <div className={classes.courseName}>
                {props.courseName}
            </div>
            <div className={classes.cancelButton} onClick={props.onRemove}>X</div>
        </div>
    );
}
