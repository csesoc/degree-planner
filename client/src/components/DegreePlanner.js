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
          selectedChip: "",
          appendedChips: [],
          timetable_slots: [],
          chipList: []
        };

        this.state.chipList = this.props.degree.compulsoryCourses.map((code, key) => {
            return(
                <Chip
                    className="chip-items"
                    label={code.course}
                    key={key}
                    color="primary"
                    style={{backgroundColor: colors[key % 6] }}
                    onClick={this.selectedChip}
                />
        )});

        this.state.chipList.push(this.props.degree.courseElectives.map((code, key) => {
            return(
                <Chip
                    className="chip-items"
                    label={code.course}
                    key={key}
                    color="primary"
                    style={{backgroundColor: colors[key % 6] }}
                    onClick={this.selectedChip}
                />
        )}))

        this.state.chipList.push(this.props.data.courses.map((code, key) => {
            return(
                <Chip
                    className="chip-items"
                    label={code.course}
                    key={key}
                    color="primary"
                    style={{backgroundColor: colors[key % 6] }}
                    onClick={this.selectedChip}
                />
        )}))
    }

    // selects chip to be added into the term boxes
    selectedChip = (event) => {
        // debugging
        this.setState({ selectedChip: event.target })

        // event.target.innerText --> code
        // for (var i = 0; i < this.state.chipList.length; i++) {
        //     if (this.state.chipList.get(i).label === event.target.innerText) {
        //         return this.state.chipList.get(i)
        //     }
        // }

        // TO-DO: Need to target the whole object and not the text
    }

    // just for functionality / will change for better ui later
    addChip = (event) => {
        if (this.state.selectedChip !== "") {
            event.target.innerText = this.state.selectedChip;
            this.setState({ appendedChips: this.state.selectedChip })
            this.setState({ selectedChip: "" });
        }
    }

    componentDidMount() {
    }


    render() {
        const { chipList } = this.state;
        return (
            <div>
                <div className="chip-container">
                    {/* codes.map((code, key) => {
                        chipList.push(<Chip
                            className="chip-items"
                            label={code}
                            key={key}
                            color="primary"
                            style={{backgroundColor: colors[key % 6] }}
                            onClick={this.selectedChip}
                        />);
                        return(
                            chipList[key]
                    )}) */}
                    {chipList}
                </div>
                <GridList cellHeight={160} cols={3}>
                    {memes.map((word, key) => (
                        <GridListTile cols={word.cols || 1}>
                            <Box border={1} className="box-container" borderColor="primary.main" onClick={this.addChip} key={key}>
                                {/* {this.state.appendedChips} */}
                                {/* <Chip
                                    className="chip-items"
                                    label="COMP2511"
                                    color="primary"
                                    style={{backgroundColor: colors[key % 6] }}
                                    onClick={this.selectedChip}
                                />
                                <Chip
                                    className="chip-items"
                                    label="COMP2521"
                                    color="primary"
                                    style={{backgroundColor: colors[key % 6] }}
                                    onClick={this.selectedChip}
                                />
                                <Chip
                                    className="chip-items"
                                    label="MATH1081"
                                    color="primary"
                                    style={{backgroundColor: colors[key % 6] }}
                                    onClick={this.selectedChip}
                                /> */}
                            </Box>
                        </GridListTile>
                    ))}
                    </GridList>
            </div>
        );
    }
}

export default DegreePlanner;
