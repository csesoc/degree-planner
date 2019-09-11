import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import '../css/DegreeSelector.css';

class DegreeSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedDegree: ""
        };
    }

    handleChange = ((changeEvent) => {
        console.log(changeEvent.target.value);
        this.setState({selectedDegree: changeEvent.target.value});
    });

    componentDidMount() {
    }

    render() {
        let degreeList = {
          "Bachelor of Engineering (Honours)": 3707,
          "Bachelor of Arts": 3409
        }
        let degreeListOptions = Object.entries(degreeList).map(([degree, degree_code]) => <option key={degree_code} value={degree_code}>{degree}</option>);
        return (
            <div>
              <Grid container spacing={3}>
                <FormControl className="degree_selector_formcontrol">
                  <InputLabel htmlFor="degree">Degree</InputLabel>
                  <Select
                    native
                    value={this.state.selectedDegree}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'Degree',
                      id: 'degree',
                    }}
                  >
                    <option value="" />
                    {degreeListOptions}
                  </Select>
                </FormControl>
              </Grid>
            </div>
        );
    }
}

export default DegreeSelector;
