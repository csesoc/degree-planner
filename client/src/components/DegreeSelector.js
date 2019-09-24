import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import '../css/DegreeSelector.css';

class DegreeSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showDegree: "",
          selectedDegree: {}
        };
    }

    handleChange = ((changeEvent) => {
        this.setState({showDegree: changeEvent.target.value});
        this.props.chooseDegree(changeEvent);
        console.log(this.state.showDegree);
    });

    componentDidMount() {
    }

    render() {
        /* let degreeList = [
            { name: "Bachelor of Engineering (Honours)", id: 3707 },
            { name: "Bachelor of Arts", id: 3409 },
        ] */
        let degreeListOptions = this.props.data.map((degree, degree_code) => <option key={degree_code} value={degree.degree}>{degree.degree}</option>)
        return (
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl className="degree_selector_formcontrol">
                      <InputLabel htmlFor="degree">Degree</InputLabel>
                      <Select
                        native
                        value={this.state.showDegree}
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
              </Grid>
            </div>
        );
    }
}

export default DegreeSelector;
