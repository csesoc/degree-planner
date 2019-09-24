import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import '../css/MajorSelector.css';

class MajorSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedMajor: "",
        };
    }

    handleChange = ((changeEvent) => {
        console.log(changeEvent.target.value);
        this.setState({selectedMajor: changeEvent.target.value});
        this.props.chooseMajor(changeEvent.target.value);
    });

    componentDidMount() {
        console.log(this.props.data)
    }

    render() {
        /* let majorList = [
          { name: "COMP1A", id: 1234 },
          { name: "COMP1B", id: 5678 },
      ] */
        let majorListOptions = this.props.data.map((major, major_code) => <option key={major_code} value={major.major}>{major.major}</option>)
        return (
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl className="major_selector_formcontrol">
                      <InputLabel htmlFor="major">Major</InputLabel>
                      <Select
                        native
                        value={this.state.selectedMajor}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'Major',
                          id: 'major',
                        }}
                      >
                        <option value="" />
                        {majorListOptions}
                      </Select>
                    </FormControl>
                </Grid>
              </Grid>
            </div>
        );
    }
}

export default MajorSelector;
