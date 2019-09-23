import React, { Component } from 'react';
import '../css/DegreePlanner.css';
import { GridList, GridListTile, Box, Chip } from '@material-ui/core';
// import Draggable from 'react-draggable';
// import { borders } from '@material-ui/system';

// TODO:
// could use drag-and-drop or select chip ???
// will incorporate calendar and export after functionality is done

// random data for testing
var memes = ["the","selections","will","automatically","generate","a","list","of","subjects","for","each","term"]
var codes = ["COMP1511","COMP1521","COMP1531","COMP2521","COMP2511","MATH1081","MATH1131","MATH1231"]
var colors = ["#ef5350","#ec407a","#7986cb","#64b5f6","#26a69a","#00e5ff"]

class DegreePlanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedChip: ""
        };
    }

    // selects chip to be added into the term boxes
    selectedChip = (event) => {
        // debugging
        console.log(event.target.innerText)
        this.setState({ selectedChip: event.target.innerText })

        // TO-DO: Need to target the whole object and not the text
    }

    // just for functionality / will change for better ui later
    addChip = (event) => {
        if (this.state.selectedChip !== "") {
            event.target.innerText = this.state.selectedChip;
            this.setState({ selectedChip: "" });
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <div>
                <div className="chip-container">
                    {codes.map((code, key) => {
                        return(
                            /* <Draggable> */
                                <Chip
                                    className="chip-items"
                                    label={code}
                                    color="primary"
                                    style={{backgroundColor: colors[key % 6] }}
                                    onClick={this.selectedChip}
                                />
                            /* </Draggable> */
                    )})}
                </div>
                <GridList cellHeight={160} cols={3}>
                    {memes.map((word, key) => (
                        <GridListTile key={key} cols={word.cols || 1}>
                            <Box border={1} className="box-container" borderColor="primary.main" onClick={this.addChip}>
                                <p>{word}</p>
                            </Box>
                        </GridListTile>
                    ))}
                    </GridList>
            </div>
        );
    }
}

export default DegreePlanner;
