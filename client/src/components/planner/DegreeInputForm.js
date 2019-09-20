import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    form: {

    }
});

export default function DegreeInputForm() {

    const classes = useStyles();
    const [degree, setDegree] = React.useState([]);
    const [major, setMajor] = React.useState([]);
    const [minor, setMinor] = React.useState([]);

    function handleDegreeChange(event) {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setDegree(value);
    };

    function handleMajorChange(event) {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setMajor(value);
    };

    function handleMinorChange(event) {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setMinor(value);
    };
    
    const degreeList = {
      "Bachelor of Engineering (Honours)": 3707,
      "Bachelor of Arts": 3409
    }
        const majorList = {
          "Software Engineering": 3707,
          "Mechanical Engineering": 3707,
          "History": 3409,
          "Philosophy": 3409
        }
        const minorList = {
          "Asian Studies": 3409,
          "Film Studies": 3409
        }
        let degreeListOptions = Object.entries(degreeList).map(([degree, degree_code]) => <option key={degree_code} value={degree_code}>{degree}</option>);
        let majorListOptions = Object.entries(majorList).map(([degree, degree_code]) => <option key={degree_code} value={degree_code}>{degree}</option>);
        let minorListOptions = Object.entries(minorList).map(([degree, degree_code]) => <option key={degree_code} value={degree_code}>{degree}</option>);

        return (
            <form className={classes.form} autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl className="degree_selector_formcontrol">
                    <InputLabel htmlFor="degree">Degree</InputLabel>
                    <Select
                      native
                      value={degree}
                      onChange={handleDegreeChange}
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
                <Grid item xs={12}>
                  <FormControl className="major_selector_formcontrol">
                    <InputLabel htmlFor="major">Major</InputLabel>
                    <Select
                      native
                      value={major}
                      onChange={handleMajorChange}
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
                <Grid item xs={12}>
                  <FormControl className="minor_selector_formcontrol">
                    <InputLabel htmlFor="minor">Minor</InputLabel>
                    <Select
                      native
                      value={minor}
                      onChange={handleMinorChange}
                      inputProps={{
                        name: 'Minor',
                        id: 'minor',
                      }}
                    >
                      <option value="" />
                      {minorListOptions}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
        );
}
