import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import DegreeInputForm from './DegreeInputForm';
import DegreePlanner from './DegreePlanner';
import NavBar from '../common/NavBar';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    plannify: {
      margin: '5%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    stepperButton: {
        margin: '5px'
    }
});

function getSteps()  {
  return ["Select Degree", "Plannify your Degree"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DegreeInputForm/>;
    case 1:
      return <DegreePlanner/>;
    default:
      throw new Error("Unknown Step");
  }
}

export default function Plannify() {

    const classes = useStyles();
    
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const steps = getSteps();

    function isStepCompleted(step) {
      return completed.has(step);
    }

    function handleNext() {
      let newCompleted = new Set(completed.values());
      newCompleted.delete(activeStep);
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setCompleted(newCompleted);
    }

    function handleBack() {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    return (
        <div className={classes.plannify}>
          <NavBar />
          <Grid container spacing={1} alignItems="center" justify="center" direction="column">
            <Grid item xs={12}>
              {getStepContent(activeStep)}
            </Grid>
            <Grid item xs={12}> 
              <Stepper activeStep={activeStep}>
                {steps.map((label,index) => {
                  const stepProps = {};
                  const buttonProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepButton onClick={handleNext} completed={isStepCompleted(index)} {...buttonProps}>
                        {label}
                      </StepButton>
                    </Step>
                  );
                })}
              </Stepper>
            </Grid>
            <Grid item xs={12}>
              <Button disabled={activeStep === 0} variant="contained" color="primary" onClick={handleBack} className={classes.stepperButton}>
                Back
              </Button>
              <Button disabled={activeStep === steps.length - 1} variant="contained" color="primary" onClick={handleNext} className={classes.stepperButton}>
                Next
              </Button>
            </Grid>
          </Grid>
        </div>
    );
}
