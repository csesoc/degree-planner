import React from 'react';
import Select from "react-select";
import Footer from "../common/Footer";
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

    return (
        <div>
            <h1>Degree Planner</h1>
            <Select
                className={classes.searchBar}
                isSearchable
                // isLoading={!Object.keys(courses).length}
                // options={courseOptions}
                // onChange={handleSearchValueChange}
            />
            <Footer/>
        </div>
    );
}
