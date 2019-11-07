import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles({
    form: {
        width: '300px',
        padding: '0 5%',
        marginTop: "1em"
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    }});

export default function DegreeInputForm() {

    const classes = useStyles();
    const [degrees, setDegrees] = React.useState([]);
    const [majors, setMajors] = React.useState([]);
    const [minors, setMinors] = React.useState([]);


    function handleDegreeChange(event) {
      setDegrees(event.target.value);
    };

    function handleDeleteDegree(value) {
      let updated = degrees.filter((curr, index, arr) => {
        return (curr !== value)
      })
      
      setDegrees(updated);
    }

    function handleMajorChange(event) {
      setMajors(event.target.value);
    };

    function handleDeleteMajor(value) {
      let updated = majors.filter((curr, index, arr) => {
        return (curr !== value)
      })
      
      setMajors(updated);
    }

    function handleMinorChange(event) {
      setMinors(event.target.value);
    };

    function handleDeleteMinor(value) {
      let updated = minors.filter((curr, index, arr) => {
        return (curr !== value)
      })
      
      setMinors(updated);
    }

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
        let degreeListOptions = Object.entries(degreeList).map(([degree, degree_code]) => 
          <MenuItem key={degree_code} value={degree}>
            <Checkbox checked={degrees.includes(degree)} />
            <ListItemText primary={degree} />
          </MenuItem>);  
        let majorListOptions = Object.entries(majorList).map(([degree, degree_code]) => 
          <MenuItem key={degree_code} value={degree}>
            <Checkbox checked={majors.includes(degree)} />
            <ListItemText primary={degree} />
        </MenuItem>);        
        let minorListOptions = Object.entries(minorList).map(([degree, degree_code]) => 
          <MenuItem key={degree_code} value={degree}>
            <Checkbox checked={minors.includes(degree)} />
            <ListItemText primary={degree} />
          </MenuItem>);
        
        return (
            <form className={classes.form} autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth className="degree_selector_formcontrol">
                    <InputLabel  htmlFor="degree">Degree</InputLabel>
                    <Select
                      multiple
                      value={degrees}
                      onChange={handleDegreeChange}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={selected => (
                        <div className={classes.chips}>
                          {selected.map(value => (
                            <Chip onDelete={() => {handleDeleteDegree(value)}} key={value} label={value} className={classes.chip} />
                          ))}
                        </div>
                      )}                      inputProps={{
                        name: 'Degree',
                        id: 'degree',
                      }}
                    >
                    {degreeListOptions}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth className="major_selector_formcontrol">
                    <InputLabel htmlFor="major">Major</InputLabel>
                    <Select
                      multiple
                      value={majors}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={selected => (
                        <div className={classes.chips}>
                          {selected.map(value => (
                            <Chip onDelete={() => {handleDeleteMajor(value)}} key={value} label={value} className={classes.chip} />
                          ))}
                        </div>
                      )}                       onChange={handleMajorChange}
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
                  <FormControl fullWidth className="minor_selector_formcontrol">
                    <InputLabel htmlFor="minor">Minor</InputLabel>
                    <Select
                      multiple
                      value={minors}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={selected => (
                        <div className={classes.chips}>
                          {selected.map(value => (
                            <Chip onDelete={() => {handleDeleteMinor(value)}} key={value} label={value} className={classes.chip} />
                          ))}
                        </div>
                      )}                       onChange={handleMinorChange}
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
